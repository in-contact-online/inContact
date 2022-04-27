import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { AppContainer } from './app/AppContainer'
import { ErrorBoundary } from './components/ErrorBoundary'
import './index.css'

ReactDOM.render(
     <HashRouter>
          <ErrorBoundary>
               <AppContainer />
          </ErrorBoundary>
     </HashRouter>,
     document.getElementById('app')
)
