import { NewLaw } from '~/components/laws/NewLaw';
import { json, Outlet, useLoaderData } from '@remix-run/react';
import { getLaws } from '~/data/expenses.server';
import { Law } from '@prisma/client';
import { useState } from 'react';


export const loader = async () => {
  const laws: Law[] = await getLaws();
  return json(laws);
};

export default function Gesetze() {
  const laws = useLoaderData<Law[]>();
  const [selectedLawId, setSelectedLawId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedLawId(id);
  };

  // Find the selected law only when selectedLawId changes
  const selectedLaw = laws.find((law) => law.id === selectedLawId);

  const analyseLaw = () => {
    // Add your analysis logic here
    console.log("Analysing law:", selectedLaw);
  };

  return (
    <>
      <h1>Eine Liste der gespeicherten Gesetze</h1>
      {laws && laws.map((law) => (
        <div
          key={law.id}
          onClick={() => handleSelect(law.id)}
          className={`mb-4 p-4 border rounded-md cursor-pointer ${
            law.id === selectedLawId ? 'bg-blue-100 border-blue-400' : 'bg-white'
          }`}
        >
          <h2 className="font-semibold">{law.title}</h2>
          <p>{law.content.substring(0, 50)}</p>
        </div>
      ))}
      {selectedLaw && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-300 rounded-md">
          <h2 className="mb-4">Ausgewähltes Gesetz: {selectedLaw.title}</h2>
          <button onClick={analyseLaw}>Analysieren</button>
        </div>
      )}
    </>
  );
}