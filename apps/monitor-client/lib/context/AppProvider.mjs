import React from 'react';
import PropTypes from 'prop-types';
import { AppContext } from './AppContext.mjs';
import { client } from '../api/index.mjs'


export function AppProvider(props) {
     const { children } = props;
     return (
          <AppContext.Provider value={{ api: client }}>
               {children}
          </AppContext.Provider>
     )
}

AppProvider.propTypes = {
     children: PropTypes.shape({})
}

AppProvider.defaultProps = {
     children: null,
}
