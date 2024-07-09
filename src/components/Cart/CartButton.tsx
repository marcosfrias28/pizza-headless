import useCartStore from '../../stores/CartStore'
import { ShoppingCartIcon } from './ShoppingCart'

function CartButton () {
  const { isCartOpen, setIsCartOpen, cart } = useCartStore()

  return (
    <button
      onClick={() => setIsCartOpen(!isCartOpen)}
      className='relative w-11 h-[44px] rounded-[5px] bg-[#f6ce40] flex items-center justify-center'
    >
      {
        cart[0] &&
          <div className='absolute -top-3 -right-3 badge flex items-center justify-center rounded-full h-7 w-7 bg-red-500 text-white'>
            {cart.map(item => item.quantity).reduce((count, qty) => count + qty, 0)}
          </div>
      }
      <ShoppingCartIcon />
    </button>
  )
}

export default CartButton
