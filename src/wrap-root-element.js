import React, { useState } from 'react'
import StoreContext, { makeDefaultContext } from './StoreContext'

const ShopifyContextWrapper = ({ children, stores }) => {
  const shopNames = Object.keys(stores)

  const changeStore = shopName => {
    const accessToken = stores[shopName]
    if (!shopName || !accessToken) {
      console.error(`invalid configuration for shop: ${shopName}`)
      return
    }

    console.log(`setting store to ${ shopName }, ${ accessToken }`)
    setStore({
      ...makeDefaultContext({
        shopName,
        accessToken,
      })
    })
  }

  const defaultShop = shopNames.length > 0 ? shopNames[0] : null
  const defaultConfig = defaultShop ? {
    shopName: defaultShop,
    accessToken: stores[defaultShop]
  } : null

  const [ store, setStore ] = useState({
    ...makeDefaultContext(defaultConfig),
    changeStore: changeStore,
  })

  return (
    <StoreContext.Provider
      value={store}
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
