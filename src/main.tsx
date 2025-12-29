import React from 'react';
import ReactDOM from 'react-dom/client';
import '@radix-ui/themes/styles.css';
import './index.css';
import App from './App';
import { Theme } from '@radix-ui/themes';
import { SolanaProvider } from './providers/SolanaProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme appearance="dark">
      <SolanaProvider>
        <App />
      </SolanaProvider>
    </Theme>
  </React.StrictMode>,
);
