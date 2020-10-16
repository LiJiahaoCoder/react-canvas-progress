import React from 'react';
import { Hint } from '../hint';

const Header = () => (
  <>
    <header className='navbar sticky-top navbar-dark bg-primary text-light'>
      <span className='navbar-brand'>React Canvas Progress</span>
    </header>
    <Hint />
  </>
);

export { Header };
