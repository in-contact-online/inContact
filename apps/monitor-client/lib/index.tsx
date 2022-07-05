import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AppContainer } from './app/AppContainer';
import { AppProvider } from './context';
import { ErrorBoundaryComponent } from './components/ErrorBoundary';
import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
const container: any = document.getElementById('app');
const root: ReactDOM.Root = ReactDOM.createRoot(container);

root.render(
    <HashRouter>
        <AppProvider>
            <QueryClientProvider client={queryClient}>
                <ErrorBoundaryComponent>
                    <AppContainer />
                </ErrorBoundaryComponent>
            </QueryClientProvider>
        </AppProvider>
    </HashRouter>
);
