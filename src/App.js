import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const updateIndex = cartList.findIndex(each => each.id === product.id)
    if (updateIndex !== -1) {
      const updateCart = cartList.map((item, index) => {
        if (index === updateIndex) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      })
      this.setState({cartList: updateCart})
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, {...product}],
      }))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const items = cartList.filter(each => each.id !== id)
    this.setState({cartList: items})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(item => {
      if (item.id === id) {
        return {...item, quantity: item.quantity + 1}
      }
      return item
    })

    this.setState({cartList: updatedCartList})

    // Return the updated cart list
    return updatedCartList
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const decreseCartListCount = cartList
      .map(each => {
        if (each.id === id) {
          if (each.quantity > 1) {
            return {...each, quantity: each.quantity - 1}
          }
          return null
        }
        return each
      })
      .filter(filteredItem => filteredItem !== null)
    this.setState({cartList: decreseCartListCount})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
