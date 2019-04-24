# gatsby-plugin-shopify-buy

## Install

```
npm install --save gatsby-plugin-shopify-buy
```

## Usage

Add the plugin to your `gatsby-config.js`:

```js
// gatsby-config.js

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-modal-routing`,
      options: {
        stores: {
          anyKeyForYourStore: {
            domain: `your-store.myshopify.com`,
            accessToken: `xxxxx`,
          },
          anotherStore: {
            domain: `store-with-custom-domain.com`,
            accessToken: `xxxxx,
          },
        }
      }
    }
  ]
];
```

### With the `StoreContext` `React.Context` component

```js
// component-in-your-app.js
import StoreContext from 'gatsby-plugin-shopify-buy'

class StoreInfo extends React.Component {
  state = {
    shopName: null,
  }

  fetchInfo = () => {
    const { client } = this.props

    client.shop.fetchInfo().then(
      shop => {
        this.setState({
          shopName: shop.name,
        })
      }
    ).catch(console.error)
  }

  componentDidMount() {
    this.fetchInfo()
  }

  render() {
    cons { shopName } = this.state
    return (
      <>
        <h2>{ this.state.shopName || 'loading...' }</h2>
      </>
    )
  }
}

const StoreInfoContainer = () => (
  <StoreContext.Consumer>
    { context => (
      <StoreInfo
        client={context.client}
      />
    ) }
  </StoreContext.Consumer>
)

export default StoreInfoContainer
```


### With the `withStoreContext` higher order component

```js
// component-in-your-app.js
import { withStoreContext } from 'gatsby-plugin-shopify-buy'

class StoreInfo extends React.Component {
  state = {
    shopName: null,
  }

  fetchInfo = () => {
    const client = this.props.storeContext.client

    client.shop.fetchInfo().then(
      shop => {
        this.setState({
          shopName: shop.name,
        })
      }
    ).catch(console.error)
  }

  componentDidMount() {
    this.fetchInfo()
  }

  render() {
    cons { shopName } = this.state
    return (
      <>
        <h2>{ this.state.shopName || 'loading...' }</h2>
      </>
    )
  }
}

export default withStoreContext(StoreInfo)
```

### Context API

The `context` passed to the `StoreContext.Consumer` or as the prop `storeContext`
to `withStoreContext` child components

**Properties**

- `activeStoreKey:String` : the key of the store which the client is currently
configured to access
- `client:ShopifyBuySDKClient` : instance of the shopify buy sdk client for
the active store. See https://shopify.github.io/js-buy-sdk/Client.html for docs
- `storeKeys:Array[String]` : a list of available store keys that were passed
to the plugin configuration

**Methods**

- `changeStore(storeKey:String):void` : method for changing the active
store configured for the client
