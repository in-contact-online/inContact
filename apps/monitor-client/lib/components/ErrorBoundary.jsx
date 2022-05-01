import React, { Component } from 'react'
import PropTypes from 'prop-types';
export class ErrorBoundary extends Component {
     constructor(props) {
          super(props)
          this.state = { hasError: false }
     }

     static getDerivedStateFromError() {
          return { hasError: true }
     }

     componentDidCatch(error) {
          // const { logger } = this.context
          // logger.error({ message: error.message, stack: JSON.stringify(error.stack) })
     }

     render() {
          const { hasError } = this.state
          const { children } = this.props

          if (hasError) {
               return <h1>Something went wrong.</h1>
          }

          return children
     }
}

// ErrorBoundary.contextType = AppContext

ErrorBoundary.defaultProps = {
     children: null,
}

ErrorBoundary.propTypes = {
     children: PropTypes.shape(null),
}
