import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { updateLaw } from '~/data/laws.server';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const lawData = Object.fromEntries(formData);

  await updateLaw(lawData);
  return redirect('/gesetze/liste');
}
