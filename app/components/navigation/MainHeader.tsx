import { Link, NavLink, useLoaderData } from '@remix-run/react';
import Logo from '../util/Logo';

function MainHeader() {
  return (
    <header id="main-header" className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <Logo />
      <nav id="main-nav">
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-semibold" : "text-white hover:text-yellow-300"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gesetze"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-semibold" : "text-white hover:text-yellow-300"
              }
            >
              Gesetze
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
