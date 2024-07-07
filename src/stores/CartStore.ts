
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Item {
  id: number
  name: string
  price: number
  quantity: number
}

type Cart = Item[]

interface CartState {
  isCartOpen: boolean
  setIsCartOpen: (isCartOpen: boolean) => void
}

interface ICartStore {
  cart: Cart
  setCart : (cart: Cart) => void
  clearCart: () => void
}


//NO PERSIST STATE, HANDLE IF CART IS OPEN OR NOT
const CartState = create<CartState>((set) => ({
  isCartOpen: false,
  setIsCartOpen: (isCartOpen: boolean) => set({isCartOpen}),
}))

const CartStore = create(persist<ICartStore>((set) => ({
  cart: [],
  setCart: (cart: Cart) => set({ cart }),
  clearCart: () => set({ cart: [] })
}), { name: 'cart-store' }))


const useCartStore = () => {
  const {setCart } = CartStore(state => ({ setCart: state.setCart }))
  const {clearCart} = CartStore(state => ({ clearCart: state.clearCart }))
  const {cart} = CartStore(state => ({ cart: state.cart }))
  const {isCartOpen} = CartState(state => ({ isCartOpen: state.isCartOpen, setIsCartOpen: state.setIsCartOpen}))
  const {setIsCartOpen} = CartState(state => ({ setIsCartOpen: state.setIsCartOpen }))
return {
  setCart,
  clearCart,
  cart,
  isCartOpen,
  setIsCartOpen
}
}

export default useCartStore