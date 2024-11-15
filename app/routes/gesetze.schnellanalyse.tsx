import { json, useFetcher } from '@remix-run/react';
import { marked } from 'marked';
import { useState, useEffect } from 'react';
import { ActionFunctionArgs } from '@remix-run/node';
import { AnalysisResponse, performAnalysis } from '~/services/lawAnalysis';
import DOMPurify from 'dompurify';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const content = formData.get('content');
  const model = formData.get('model');

  if (typeof content === 'string' && typeof model === 'string') {
    try {
      const analysis = await performAnalysis(content, model);
      return json({ analysis });
    } catch (error) {
      console.error(error);
      throw new Response(`Analysis failed: ${error}`, { status: 500 });
    }
  } else {
    throw new Response('Invalid input for analyse operation', {
      status: 400,
    });
  }
};

export default function GesetzeSchnellanalyse() {
  const fetcher = useFetcher<AnalysisResponse>();
  const [model] = useState(
    window ? window.localStorage.getItem('model') || '' : '',
  );
  const [sanitizedHtml, setSanitizedHtml] = useState<string>('');

  useEffect(() => {
    const sanitizeHtml = async () => {
      if (fetcher.data?.analysis && typeof fetcher.data.analysis === 'string') {
        try {
          const parsedHtml = await marked.parse(fetcher.data.analysis);
          const cleanHtml = DOMPurify.sanitize(parsedHtml);
          setSanitizedHtml(cleanHtml);
        } catch (error) {
          console.error('Failed to sanitize analysis content:', error);
        }
      }
    };

    sanitizeHtml();
  }, [fetcher.data?.analysis]);

  return (
    <>
      <h1>Hier können Sie einen Gesetzestext direkt analysieren lassen</h1>
      <fetcher.Form method='post'>
        <textarea
          name='content'
          rows={4}
          className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Gesetzestext einfügen'
          required
        ></textarea>
        <input type='hidden' name='model' value={model} />
        <div className='mt-6 p-4 bg-blue-50 border border-blue-300 rounded-md'>
          <button type='submit' disabled={fetcher.state === 'submitting'}>
            {fetcher.state === 'submitting' ? 'Analysieren...' : 'Analysieren'}
          </button>
        </div>
      </fetcher.Form>

      {sanitizedHtml && (
        <div className='mt-6 p-4 bg-green-50 border border-green-300 rounded-md'>
          <h1>Analyse-Ergebnis:</h1>
          <p dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
        </div>
      )}
    </>
  );
}
