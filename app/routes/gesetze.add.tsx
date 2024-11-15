// /expenses/add

import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { addLaw } from '~/data/laws.server';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const lawData = Object.fromEntries(formData);

  await addLaw(lawData);
  return redirect('..');
}
