import { useEffect, useState } from 'react';

export default function Modelle() {
  const [model, setModel] = useState<string | null>(() => {
    // Initialize state from localStorage
    return window.localStorage.getItem('model');
  });

  useEffect(() => {
    if (model !== null) {
      window.localStorage.setItem('model', model);
    }
  }, [model]);

  return (
    <>
      <h1 className='text-center py-4'>
        Wählen Sie ein KI-Modell zur Analyse aus
      </h1>
      <ol className='flex justify-center space-x-6'>
        <li>
          <button
            onClick={() => setModel('ollama')}
            className='px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 active:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg'
          >
            Ollama
          </button>
        </li>
        <li>
          <button
            onClick={() => setModel('openai')}
            className='px-6 py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 active:bg-green-700 transition duration-200 shadow-md hover:shadow-lg'
          >
            OpenAI ChatGPT
          </button>
        </li>
      </ol>
      <h2 className='text-center pt-8'>
        Aktuell gewähltes Modell: <b>{model || 'Keines'}</b>
      </h2>
    </>
  );
}
