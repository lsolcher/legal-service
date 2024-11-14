import { Link, Outlet } from '@remix-run/react';
import { useEffect, useState } from 'react';

export default function Gesetze() {
  const [model, setModel] = useState<string | null>(null);

  useEffect(() => {
    const storedModel = window.localStorage.getItem('model');
    setModel(storedModel || 'kein Modell. Bitte Modell auswählen!');
  }, []);

  return (
    <div className='flex flex-col items-center p-6 space-y-6'>
      <h1>Aktuell gewähltes Modell: {model}</h1>
      <h1 className='text-3xl font-bold text-gray-800'>Gesetze</h1>
      <ol className='space-y-4'>
        <li>
          <Link
            to='/gesetze/hinzufuegen'
            className='text-lg text-blue-600 hover:text-blue-800 hover:underline'
          >
            Neues Gesetz hinzufügen
          </Link>
        </li>
        <li>
          <Link
            to='/gesetze/liste'
            className='text-lg text-blue-600 hover:text-blue-800 hover:underline'
          >
            Eine Liste der gespeicherten Gesetze
          </Link>
        </li>
      </ol>
      <div className='w-full max-w-4xl'>
        <Outlet />
      </div>
    </div>
  );
}
