import React, { useState } from 'react';
import Prism from 'prismjs';

import './index.scss';

Prism.highlightAll();

interface ExampleProps {
  title: string;
  code: string;
}

const Example: React.FC<ExampleProps> = ({ title, code, children }) => {
  const [expanded, setExpanded] = useState(false);

  return <div className='card mb-4 text-center'>
    <div className='card-body overflow-hidden'>
      <div className='d-flex flex-column align-items-center'>
        { children }
      </div>

      <p
        className='text-truncate user-select-none font-weight-light mt-3'
        title={title}
      >
        { title }
      </p>

      <button
        type='button'
        className='btn btn-light text-info'
        onClick={() => setExpanded(pre => !pre)}
      >
        &lt;{expanded ? '\/' : ''}&gt;
      </button>

      <div className={`code ${expanded ? '' : 'hide'}`}>
        <pre>
          <code className='lang-tsx'>{ code }</code>
        </pre>
      </div>
    </div>
  </div>;
};

export { Example };
