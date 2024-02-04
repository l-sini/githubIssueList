import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App.tsx';
import './index.css';

const { VITE_QUERY_STALE_TIME } = import.meta.env;

const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number(VITE_QUERY_STALE_TIME),
      cacheTime: Number(VITE_QUERY_STALE_TIME),
      retryDelay: 3000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={reactQueryClient}>
        <App />
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
