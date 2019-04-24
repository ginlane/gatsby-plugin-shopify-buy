import React from 'react'
import Client from 'shopify-buy'

const defaultStoreContext = {
  client: null,
}

const makeDefaultContext = config => (
  {
    ...defaultStoreContext,
    client: Client.buildClient(config),
  }
)

const StoreContext = React.createContext(defaultStoreContext)

const withStoreContext = Component => {
  return props => (
    <StoreContext.Consumer>
      {context => <Component {...props} storeContext={context} />}
    </StoreContext.Consumer>
  )
}

export {
  withStoreContext,
  makeDefaultContext,
  StoreContext as default
}
