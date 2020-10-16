import 'bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from './components/header';
import { Main } from './components/main';

import './index.scss';

const App = () => (
  <>
    <Header />
    <Main />
  </>
);

ReactDOM.render(
  <App />,
  document.querySelector('#app'),
);
