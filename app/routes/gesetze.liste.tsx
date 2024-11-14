import { json, useFetcher, useLoaderData } from '@remix-run/react';
import { deleteLaw, getLaws } from '~/data/laws.server';
import { Law } from '@prisma/client';
import { useState } from 'react';
import { marked } from 'marked';
import { ActionFunctionArgs } from '@remix-run/node';

export const loader = async () => {
  const laws: Law[] = await getLaws();
  return json(laws);
};

// Action function to delete a law
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const lawId = formData.get('lawId');
  if (typeof lawId === 'string') {
    await deleteLaw(lawId);
  }
  return null;
};

export default function Gesetze() {
  const laws = useLoaderData<Law[]>();
  const fetcher = useFetcher();
  const [selectedLawId, setSelectedLawId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalysing, setAnalysing] = useState<boolean>(false);

  const handleSelect = (id: string) => {
    setSelectedLawId(id);
  };

  const handleDelete = (lawId: string) => {
    if (window.confirm('Soll dieses Gesetz wirklich gelöscht werden?')) {
      fetcher.submit({ lawId }, { method: 'post' });
    }
  };
  const selectedLaw = laws.find((law) => law.id === selectedLawId);

  const analyseLaw = async () => {
    setAnalysing(true);
    if (!selectedLaw) return;

    try {
      const response = await fetch('/api/analyse-law', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: selectedLaw.content,
          model: window.localStorage.getItem('model'),
        }),
      });

      if (!response.ok) {
        throw new Error(`Fehler: ${response.status}`);
      }

      const data = await response.json();
      console.log('Data:', data);

      setAnalysis(data.analysis); // Zustand aktualisieren, um das Ergebnis anzuzeigen
      console.log('Analysis result:', data.analysis);
    } catch (error) {
      throw new Error(error);
    }
    setAnalysing(false);
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
          {isAnalysing ? (
            <div role='status'>
              <svg
                aria-hidden='true'
                className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          ) : (
            <button disabled={isAnalysing} onClick={analyseLaw}>
              Analysieren
            </button>
          )}
        </div>
      )}
      {analysis && (
        <div className='mt-6 p-4 bg-green-50 border border-green-300 rounded-md'>
          <h1>Analyse-Ergebnis:</h1>
          <p dangerouslySetInnerHTML={{ __html: marked.parse(analysis) }} />
        </div>
      )}
    </>
  );
}
