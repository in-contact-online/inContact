import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AppContainer } from './app/AppContainer';
import { AppProvider } from './context/index.mjs';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';


const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);

root.render(
     <HashRouter>
          <AppProvider>
               <ErrorBoundary>
                    <AppContainer />
               </ErrorBoundary>
          </AppProvider>
     </HashRouter>
);
