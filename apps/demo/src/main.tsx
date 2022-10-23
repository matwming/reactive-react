import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';

import App from './app/app';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
