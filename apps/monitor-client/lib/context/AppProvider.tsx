import React, { FC } from 'react';
import { AppContext } from './AppContext';
import { client } from '../api'

type Props = {
     children: React.ReactNode
}

export function AppProvider(props: Props) {
     return (
          <AppContext.Provider value={{ api: client }}>
               {props.children}
          </AppContext.Provider>
     )
}
