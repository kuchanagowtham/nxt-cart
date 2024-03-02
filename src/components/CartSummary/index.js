// Write your code here
// import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = props => {
  const {cartList} = props
  const itemsinCart = cartList.length
  const details = cartList.map(each => each.price * each.quantity)
  const total = details.reduce((acc, crr) => acc + crr, 0)

  return (
    <div className="cart-summary">
      <h1 className="order-heading">
        Order Total: <span className="price">Rs {total}/-</span>
      </h1>
      <p className="cart-length">{itemsinCart} Items in cart</p>
      <button className="check-btn" type="button">
        Checkout
      </button>
    </div>
  )
}

export default CartSummary
