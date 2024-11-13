import { json, useLoaderData } from '@remix-run/react';
import { getLaws } from '~/data/laws.server';
import { Law } from '@prisma/client';
import { useState } from 'react';
import parse from 'html-react-parser';


export const loader = async () => {
  const laws: Law[] = await getLaws();
  return json(laws);
};

export default function Gesetze() {
  const laws = useLoaderData<Law[]>();
  const [selectedLawId, setSelectedLawId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>(""); // Zustand für Analysis hinzufügen

  const handleSelect = (id: string) => {
    setSelectedLawId(id);
  };

  const selectedLaw = laws.find((law) => law.id === selectedLawId);

  const analyseLaw = async () => {
    if (!selectedLaw) return;

    try {
      const response = await fetch("/api/analyse-law", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: selectedLaw.content }),
      });

      if (!response.ok) {
        throw new Error(`Fehler: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data:", data)

      setAnalysis(data.analysis); // Zustand aktualisieren, um das Ergebnis anzuzeigen
      console.log("Analysis result:", data.analysis);
    } catch (error) {
      console.error("Fehler beim Abrufen der Analyse:", error);
    }
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
        {analysis && (
            <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-md">
              <h2>Analyse-Ergebnis:</h2>
              <p>{parse(analysis)}</p>
            </div>
        )}
      </>
  );
}
