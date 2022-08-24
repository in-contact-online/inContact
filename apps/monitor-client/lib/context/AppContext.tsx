import React, { createContext } from 'react';
import { ApiClient } from '../api';
import { IAppPersistentStorage } from '../../utils';

export interface IAppContext {
    api: ApiClient | null;
    appPersistentStorage: IAppPersistentStorage | null;
}

export const AppContext: React.Context<IAppContext> = createContext<IAppContext>({
    api: null,
    appPersistentStorage: null,
});
