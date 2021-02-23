import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import Routes from './Routes';
import AppProvider from './Hooks';
import GlobalStyle from './Styles/global';

const App: React.FC = () => (

  <BrowserRouter>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
