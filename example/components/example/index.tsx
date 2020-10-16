import React from 'react';

interface ExampleProps {
  title: string;
}

const Example: React.FC<ExampleProps> = ({ title, children }) => (
  <div className='card mb-4'>
    <div className='card-body overflow-hidden'>
      <div className='d-flex flex-column align-items-center'>
        { children }
      </div>
      <p className='text-center font-weight-light mt-3'>{ title }</p>
    </div>
  </div>
);

export { Example };
