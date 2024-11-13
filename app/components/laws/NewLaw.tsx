import { Form } from '@remix-run/react';

export function NewLaw() {
  return (
    <Form method="post" id="law-form" action="/gesetze/add" className="bg-gray-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
      <p className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-1">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </p>
      <p className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-medium mb-1">Inhalt</label>
        <textarea
          id="content"
          name="content"
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </p>
      <div className="form-actions">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Gesetz hinzufügen
        </button>
      </div>
    </Form>
  )
}
