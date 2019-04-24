import React from 'react'
import Client from 'shopify-buy'

const defaultStoreContext = {
  client: null,
}

const makeClient = ({ shopName, accessToken }) => (
  Client.buildClient({
    domain: `${ shopName }.myshopify.com`,
    storefrontAccessToken: accessToken,
  })
)

const makeDefaultContext = ({ shopName, accessToken }) => (
  {
    ...defaultStoreContext,
    client: makeClient({
      shopName,
      accessToken
    }),
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
