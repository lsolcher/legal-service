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
  const [analysis, setAnalysis] = useState<string>(''); // Zustand für Analysis hinzufügen

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
    if (!selectedLaw) return;

    try {
      const response = await fetch('/api/analyse-law', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: selectedLaw.content }),
      });

      if (!response.ok) {
        throw new Error(`Fehler: ${response.status}`);
      }

      const data = await response.json();
      console.log('Data:', data);

      setAnalysis(data.analysis); // Zustand aktualisieren, um das Ergebnis anzuzeigen
      console.log('Analysis result:', data.analysis);
    } catch (error) {
      console.error('Fehler beim Abrufen der Analyse:', error);
    }
  };

  return (
    <>
      <h1>Eine Liste der gespeicherten Gesetze</h1>
      <div className='flex flex-col'>
        {laws &&
          laws.map((law) => (
            <button
              key={law.id}
              onClick={() => handleSelect(law.id)}
              className={`mb-4 p-4 border rounded-md cursor-pointer ${
                law.id === selectedLawId
                  ? 'bg-blue-100 border-blue-400'
                  : 'bg-white'
              }`}
            >
              <h2 className='font-semibold text-left'>{law.title}</h2>
              <p className='text-left'>{law.content.substring(0, 50)}</p>
              <div className='flex justify-between mt-2'>
                <button className='text-blue-600'>Edit</button>
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
            </button>
          ))}
      </div>
      {selectedLaw && (
        <div className='mt-6 p-4 bg-blue-50 border border-blue-300 rounded-md'>
          <h2 className='mb-4'>Ausgewähltes Gesetz: {selectedLaw.title}</h2>
          <button onClick={analyseLaw}>Analysieren</button>
        </div>
      )}
      {analysis && (
        <div className='mt-6 p-4 bg-green-50 border border-green-300 rounded-md'>
          <h2>Analyse-Ergebnis:</h2>
          <p dangerouslySetInnerHTML={{ __html: marked.parse(analysis) }} />
        </div>
      )}
    </>
  );
}
