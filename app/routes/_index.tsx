import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Gesetze Analysieren' },
    {
      name: 'description',
      content:
        'Analysieren und verwalten Sie Gesetze mit modernster Technologie.',
    },
  ];
};

export default function Index() {
  return (
    <div className='flex flex-col h-screen items-center justify-center bg-gray-100 p-6 space-y-10'>
      {/* Header Section */}
      <header className='text-center space-y-4'>
        <h1 className='text-4xl font-extrabold text-gray-900'>
          Willkommen bei{' '}
          <span className='text-blue-600'>Gesetze Analysieren</span>
        </h1>
        <p className='text-lg text-gray-700 max-w-3xl'>
          Entdecken Sie eine Plattform, die es Ihnen ermöglicht, Gesetze
          effizient zu verwalten, zu analysieren und zu bewerten – mit
          Unterstützung modernster KI-Technologien.
        </p>
      </header>

      {/* Features Section */}
      <section className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl'>
        {/* Feature 1 */}
        <div className='bg-white p-6 rounded-lg shadow-md text-center'>
          <h2 className='text-2xl font-bold text-gray-800'>
            📜 Gesetzesverwaltung
          </h2>
          <p className='text-gray-600 mt-4'>
            Speichern, durchsuchen und organisieren Sie Ihre Gesetze an einem
            zentralen Ort.
          </p>
        </div>
        {/* Feature 2 */}
        <div className='bg-white p-6 rounded-lg shadow-md text-center'>
          <h2 className='text-2xl font-bold text-gray-800'>
            🔍 Schnelle Analysen
          </h2>
          <p className='text-gray-600 mt-4'>
            Lassen Sie Gesetzestexte mit nur wenigen Klicks analysieren und
            bewerten.
          </p>
        </div>
        {/* Feature 3 */}
        <div className='bg-white p-6 rounded-lg shadow-md text-center'>
          <h2 className='text-2xl font-bold text-gray-800'>🤝 Kollaboration</h2>
          <p className='text-gray-600 mt-4'>
            Teilen Sie Analysen und Notizen mit Ihrem Team für eine bessere
            Zusammenarbeit.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <footer className='text-center'>
        <Link
          to='/gesetze'
          className='px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-800 transition duration-200 inline-block'
        >
          Jetzt loslegen
        </Link>
      </footer>
    </div>
  );
}
