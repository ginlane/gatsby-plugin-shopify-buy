import React, { useState } from 'react'
import StoreContext, { makeDefaultContext } from './StoreContext'

const ShopifyContextWrapper = ({ children, stores }) => {
  const shopNames = Object.keys(stores)
  const defaultShop = shopNames[0] || null
  const defaultConfig = stores[defaultShop] || null

  const [ store, setStore ] = useState({
    activeStoreName: defaultShop,
    ...makeDefaultContext(defaultConfig),
  })

  const changeStore = storeKey => {
    const storeConfig = stores[storeKey]
    if (!storeConfig) {
      console.error(`invalid configuration for shop: ${storeKey}`)
      return
    }

    setStore({
      activeStoreName: storeKey,
      ...makeDefaultContext(storeConfig),
    })
  }

  return (
    <StoreContext.Provider
      value={{
        ...store,
        shopNames,
        changeStore,
      }}
    >
      { children }
    </StoreContext.Provider>
  )
}

export default ({ element }, pluginOptions) => {
  return (
    <ShopifyContextWrapper
      stores={pluginOptions.stores}
    >
      { element }
    </ShopifyContextWrapper>
  )
}
