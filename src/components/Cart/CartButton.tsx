import useCartStore from '../../stores/CartStore'
import { ShoppingCartIcon } from './ShoppingCart'

function CartButton () {
  const {isCartOpen, setIsCartOpen} = useCartStore()

  return (
    <button
    onClick={()=> setIsCartOpen(!isCartOpen)}
      className='w-11 h-[44px] rounded-[5px] bg-[#f6ce40] flex items-center justify-center'
    >
      <ShoppingCartIcon />
    </button>
  )
}

export default CartButton
