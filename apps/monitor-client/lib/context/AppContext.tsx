import React, { createContext } from 'react';
import { ApiClient } from '../api'

export interface IAppContext {
     api: ApiClient|null;
   }

export const AppContext: React.Context<IAppContext> = createContext<IAppContext>({
     api: null
});
