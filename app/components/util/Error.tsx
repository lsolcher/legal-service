import { FaExclamationCircle } from 'react-icons/fa';
import React from 'react';

function Error({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className='error'>
      <div className='icon'>
        <FaExclamationCircle />
      </div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default Error;
