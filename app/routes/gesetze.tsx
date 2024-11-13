import { Link, Outlet } from '@remix-run/react';

export default function Gesetze() {
  return (
      <div className="flex flex-col items-center p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Gesetze</h1>
        <ol className="space-y-4">
          <li>
            <Link
                to="/gesetze/hinzufuegen"
                className="text-lg text-blue-600 hover:text-blue-800 hover:underline"
            >
              Neues Gesetz hinzufügen
            </Link>
          </li>
          <li>
            <Link
                to="/gesetze/liste"
                className="text-lg text-blue-600 hover:text-blue-800 hover:underline"
            >
              Eine Liste der gespeicherten Gesetze
            </Link>
          </li>
        </ol>
        <div className="w-full max-w-4xl">
          <Outlet />
        </div>
      </div>
  );
}
