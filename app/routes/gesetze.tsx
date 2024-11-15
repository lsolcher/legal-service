import { Link, Outlet } from '@remix-run/react';
import { useEffect, useState } from 'react';

export default function Gesetze() {
  const [model, setModel] = useState<string | null>(null);

  useEffect(() => {
    const storedModel = window.localStorage.getItem('model');
    setModel(storedModel || 'kein Modell. Bitte Modell auswählen!');
  }, []);

  return (
    <div className='flex flex-row w-full p-6 bg-gray-100 rounded-lg shadow-lg'>
      {/* Sidebar Navigation */}
      <nav className='w-1/4 max-w-sm p-4 bg-white rounded-md shadow-md'>
        <h1 className='text-lg font-semibold text-gray-600 mb-4'>
          Aktuell gewähltes Modell:{' '}
          <span className='text-blue-700'>{model}</span>
        </h1>
        <h2 className='text-xl font-bold text-gray-800 mb-6'>Gesetze</h2>
        <ol className='space-y-4'>
          <li>
            <Link
              to='/gesetze/hinzufuegen'
              className='block text-lg text-blue-600 hover:text-blue-800 hover:underline transition duration-200'
            >
              ➕ Neues Gesetz hinzufügen
            </Link>
          </li>
          <li>
            <Link
              to='/gesetze/liste'
              className='block text-lg text-blue-600 hover:text-blue-800 hover:underline transition duration-200'
            >
              📜 Eine Liste der gespeicherten Gesetze
            </Link>
          </li>
          <li>
            <Link
              to='/gesetze/schnellanalyse'
              className='block text-lg text-blue-600 hover:text-blue-800 hover:underline transition duration-200'
            >
              🔍 Einen Gesetzestext direkt analysieren lassen
            </Link>
          </li>
        </ol>
      </nav>

      {/* Main Content */}
      <main className='flex-1 p-6 bg-white rounded-md shadow-md ml-6'>
        <Outlet />
      </main>
    </div>
  );
}
