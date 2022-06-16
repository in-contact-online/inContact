import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { AppContainer } from './app/AppContainer';
import { AppProvider } from './context';
import { ErrorBoundaryComponent } from './components/ErrorBoundary';
import './index.css';

const container: any = document.getElementById('app');
const root: ReactDOM.Root = ReactDOM.createRoot(container);

root.render(
    <HashRouter>
        <AppProvider>
            <ErrorBoundaryComponent>
                <AppContainer />
            </ErrorBoundaryComponent>
        </AppProvider>
    </HashRouter>
);
