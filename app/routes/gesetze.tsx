import { Link, Outlet } from '@remix-run/react';

export default function gesetze() {
  return (
    <>
    <h1>Gesetze</h1>
      <ol>
        <li>
          <Link to="/gesetze/hinzufuegen">Neues Gesetz hinzufügen</Link>
        </li>
        <li>
          <Link to="/gesetze/liste">Eine Liste der gespeicherten Gesetze</Link>
        </li>
      </ol>
      <Outlet />
    </>
  )
}