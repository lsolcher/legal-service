import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Law } from '@prisma/client';
import { getLawById } from '~/data/laws.server';
import { LawForm } from '~/components/laws/LawForm';

export async function loader({ params }: LoaderFunctionArgs) {
  console.log(params);
  return json(await getLawById(params.gesetz));
}
export default function EditGesetz() {
  const law = useLoaderData<Law>();
  return <LawForm method='put' action={`/gesetze/${law.id}/edit`} law={law} />;
}
