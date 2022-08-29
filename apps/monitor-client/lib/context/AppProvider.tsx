import React from 'react';
import { AppContext } from './AppContext';
import { client } from '../api';
import { appPersistentStorage } from '../../utils';

type Props = {
    children: React.ReactNode;
};

export function AppProvider(props: Props) {
    return <AppContext.Provider value={{ api: client, appPersistentStorage }}>{props.children}</AppContext.Provider>;
}
