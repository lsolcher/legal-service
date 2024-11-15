import { Outlet } from '@remix-run/react';
import React, { useEffect } from 'react';

export default function Modelle() {
  const [model, setModel] = React.useState<string | null>(null);

  useEffect(() => {
    if (model !== null) {
      window.localStorage.setItem('model', model);
      window.alert(`Das Modell wurde auf ${model} gesetzt!`);
    }
  }, [model]);

  return (
    <div className='flex flex-col items-center p-6 space-y-6'>
      <h1 className='text-3xl font-bold text-gray-800'>
        Wählen Sie ein KI-Modell zur Analyse aus
      </h1>
      <ol className='space-y-4'>
        <li>
          <button
            onClick={() => setModel('ollama')}
            className='text-lg text-blue-600 hover:text-blue-800 hover:underline'
          >
            Ollama
          </button>
        </li>
        <li>
          <button
            onClick={() => setModel('openai')}
            className='text-lg text-blue-600 hover:text-blue-800 hover:underline'
          >
            Open Ai ChatGPT
          </button>
        </li>
      </ol>
      <div className='w-full max-w-4xl'>
        <Outlet />
      </div>
    </div>
  );
}
