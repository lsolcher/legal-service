import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from '@remix-run/react';

import './tailwind.css';
import MainHeader from '~/components/navigation/MainHeader';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <title>Gesetzesanalyse</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <MainHeader />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang='en'>
      <head>
        <title>Error - Gesetzesanalyse</title>
        <Meta />
        <Links />
      </head>
      <body>
        <MainHeader />
        <div>
          {isRouteErrorResponse(error) ? (
            <>
              <h1>
                {error.status} {error.statusText}
              </h1>
              <p>{error.data}</p>
            </>
          ) : error instanceof Error ? (
            <>
              <h1>Error</h1>
              <p>{error.message}</p>
              <p>The stack trace is:</p>
              <pre>{error.stack}</pre>
            </>
          ) : (
            <h1>Unknown Error</h1>
          )}
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
