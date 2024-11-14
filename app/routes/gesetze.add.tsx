// /expenses/add

import { redirect } from '@remix-run/node';
import { addLaw } from '~/data/laws.server';

export default function AddLawPage() {
  return <h1>Gesetz erfolgreich zur Datenbankbank hinzugefügt!</h1>;
}

export async function action({ request }) {
  const formData = await request.formData();

  const lawData = Object.fromEntries(formData);

  await addLaw(lawData);
  return redirect('..');
}
