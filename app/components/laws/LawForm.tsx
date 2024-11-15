import { Form } from '@remix-run/react';
import { Law } from '@prisma/client';

export function LawForm({
  method = 'post',
  action = '/gesetze/add',
  law = {},
}: {
  method?: string;
  action?: string;
  law?: Law;
}) {
  return (
    <Form
      method={method}
      id='law-form'
      action={action}
      className='bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto'
    >
      {/* Hidden input for ID */}
      {law.id && <input type='hidden' name='id' value={law.id} />}
      <p className='mb-4'>
        <label htmlFor='title' className='block text-gray-700 font-medium mb-1'>
          Title
        </label>
        <input
          type='text'
          id='title'
          name='title'
          required
          defaultValue={law.title || ''}
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </p>
      <p className='mb-4'>
        <label
          htmlFor='content'
          className='block text-gray-700 font-medium mb-1'
        >
          Inhalt
        </label>
        <textarea
          id='content'
          name='content'
          required
          defaultValue={law.content || ''}
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </p>
      <div className='form-actions'>
        <button
          type='submit'
          className='bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          {method === 'post' ? 'Gesetz hinzufügen' : 'Gesetz aktualisieren'}
        </button>
      </div>
    </Form>
  );
}
