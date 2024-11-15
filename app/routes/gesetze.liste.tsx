import { json, Link, useFetcher, useLoaderData } from '@remix-run/react';
import { deleteLaw, getLaws } from '~/data/laws.server';
import { Law } from '@prisma/client';
import { useState, useEffect } from 'react';
import { marked } from 'marked';
import { ActionFunctionArgs } from '@remix-run/node';
import { AnalysisResponse, performAnalysis } from '~/services/lawAnalysis';
import DOMPurify from 'dompurify';

export const loader = async () => {
  const laws: Law[] = await getLaws();
  return json(laws);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const type = formData.get('type'); // "delete" oder "analyse"

  if (type === 'delete') {
    const lawId = formData.get('lawId');
    if (typeof lawId === 'string') {
      await deleteLaw(lawId);
      return null; // Erfolg: Kein weiterer Inhalt nötig
    } else {
      throw new Response('Invalid lawId for delete operation', { status: 400 });
    }
  }

  if (type === 'analyse') {
    const content = formData.get('content');
    const model = formData.get('model');

    if (typeof content === 'string' && typeof model === 'string') {
      try {
        const analysis = await performAnalysis(content, model);
        return json({ analysis });
      } catch (error) {
        console.error(error);
        throw new Response(`Analysis failed: ${error}`, { status: 500 });
      }
    } else {
      throw new Response('Invalid input for analyse operation', {
        status: 400,
      });
    }
  }

  throw new Response('Unsupported operation type', { status: 400 });
};

export default function Gesetze() {
  const laws = useLoaderData<Law[]>();
  const fetcher = useFetcher<AnalysisResponse>();
  const [selectedLawId, setSelectedLawId] = useState<string | null>(null);
  const [sanitizedHtml, setSanitizedHtml] = useState<string>('');

  const handleSelect = (id: string) => {
    setSelectedLawId(id);
  };

  const handleDelete = (lawId: string) => {
    if (window.confirm('Soll dieses Gesetz wirklich gelöscht werden?')) {
      fetcher.submit({ type: 'delete', lawId }, { method: 'post' });
    }
  };

  const selectedLaw = laws.find((law) => law.id === selectedLawId);

  const analyseLaw = () => {
    if (!selectedLaw) return;

    fetcher.submit(
      {
        type: 'analyse',
        content: selectedLaw.content,
        model: window.localStorage.getItem('model') || '',
      },
      { method: 'post' },
    );
  };

  useEffect(() => {
    const sanitizeHtml = async () => {
      if (fetcher.data?.analysis && typeof fetcher.data.analysis === 'string') {
        try {
          const parsedHtml = await marked.parse(fetcher.data.analysis);
          const cleanHtml = DOMPurify.sanitize(parsedHtml);
          setSanitizedHtml(cleanHtml);
        } catch (error) {
          console.error('Failed to sanitize analysis content:', error);
        }
      }
    };

    sanitizeHtml();
  }, [fetcher.data?.analysis]);

  return (
    <>
      <h1>Eine Liste der gespeicherten Gesetze</h1>
      <div className='flex flex-col'>
        {laws &&
          laws.map((law) => (
            <button
              onClick={() => handleSelect(law.id)}
              key={law.id}
              className={`mb-4 p-4 border rounded-md ${
                law.id === selectedLawId
                  ? 'bg-blue-100 border-blue-400'
                  : 'bg-white'
              }`}
            >
              <h2 className='font-semibold text-left'>{law.title}</h2>
              <p className='text-left'>{law.content.substring(0, 50)}</p>
              <div className='flex justify-between mt-2'>
                <Link to={`../${law.id}`} className='text-blue-600'>
                  Editieren
                </Link>
                <fetcher.Form
                  method='post'
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleDelete(law.id);
                  }}
                >
                  <input type='hidden' name='lawId' value={law.id} />
                  <button type='submit' className='text-red-600'>
                    Löschen
                  </button>
                </fetcher.Form>
              </div>
            </button>
          ))}
      </div>

      {selectedLaw && (
        <div className='mt-6 p-4 bg-blue-50 border border-blue-300 rounded-md'>
          <h2 className='mb-4'>Ausgewähltes Gesetz: {selectedLaw.title}</h2>
          <button
            disabled={fetcher.state === 'submitting'}
            onClick={analyseLaw}
          >
            {fetcher.state === 'submitting' ? 'Analysieren...' : 'Analysieren'}
          </button>
        </div>
      )}
      {sanitizedHtml && (
        <div className='mt-6 p-4 bg-green-50 border border-green-300 rounded-md'>
          <h1>Analyse-Ergebnis:</h1>
          <p dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
        </div>
      )}
    </>
  );
}
