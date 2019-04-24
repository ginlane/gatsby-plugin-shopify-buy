import React, { useState } from 'react'
import StoreContext, { makeDefaultContext } from './StoreContext'

const ShopifyContextWrapper = ({ children, stores }) => {
  const storeKeys = Object.keys(stores)
  const defaultShop = storeKeys[0] || null
  const defaultConfig = stores[defaultShop] || null

  const [ store, setStore ] = useState({
    activeStoreKey: defaultShop,
    ...makeDefaultContext(defaultConfig),
  })

  const changeStore = storeKey => {
    const storeConfig = stores[storeKey]
    if (!storeConfig) {
      console.error(`invalid configuration for shop: ${storeKey}`)
      return
    }

    setStore({
      activeStoreKey: storeKey,
      ...makeDefaultContext(storeConfig),
    })
  }

  return (
    <StoreContext.Provider
      value={{
        ...store,
        storeKeys,
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
