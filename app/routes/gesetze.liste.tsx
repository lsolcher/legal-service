import { json, useFetcher, useLoaderData } from '@remix-run/react';
import { deleteLaw, getLaws } from '~/data/laws.server';
import { Law } from '@prisma/client';
import { useState } from 'react';
import { marked } from 'marked';
import { ActionFunctionArgs } from '@remix-run/node';
import { AnalysisResponse, performAnalysis } from '~/services/lawAnalysis';

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

  return (
    <>
      <h1>Eine Liste der gespeicherten Gesetze</h1>
      <div className='flex flex-col'>
        {laws &&
          laws.map((law) => (
            <div
              key={law.id}
              className={`mb-4 p-4 border rounded-md ${law.id === selectedLawId ? 'bg-blue-100 border-blue-400' : 'bg-white'}`}
            >
              <h2 className='font-semibold text-left'>{law.title}</h2>
              <p className='text-left'>{law.content.substring(0, 50)}</p>
              <div className='flex justify-between mt-2'>
                <button
                  onClick={() => handleSelect(law.id)}
                  className='text-blue-600'
                >
                  Edit
                </button>
                <fetcher.Form
                  method='post'
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleDelete(law.id);
                  }}
                >
                  <input type='hidden' name='lawId' value={law.id} />
                  <button type='submit' className='text-red-600'>
                    Delete
                  </button>
                </fetcher.Form>
              </div>
            </div>
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
      {fetcher.data?.analysis && (
        <div className='mt-6 p-4 bg-green-50 border border-green-300 rounded-md'>
          <h1>Analyse-Ergebnis:</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: marked.parse(fetcher.data.analysis),
            }}
          />
        </div>
      )}
    </>
  );
}
