
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Item {
  id: string
  name: string
  price: number
  quantity: number
  cover: string
}

export type Cart = Item[]

interface CartState {
  isCartOpen: boolean
  setIsCartOpen: (isCartOpen: boolean) => void
}

interface ICartStore {
  cart: Cart
  setCart: (cart: Cart) => void
  clearCart: () => void
}

// NO PERSIST STATE, HANDLE IF CART IS OPEN OR NOT
const CartState = create<CartState>((set) => ({
  isCartOpen: false,
  setIsCartOpen: (isCartOpen: boolean) => set({ isCartOpen })
}))

const CartStore = create(persist<ICartStore>((set) => ({
  cart: [],
  setCart: (cart: Cart) => set({ cart }),
  clearCart: () => set({ cart: [] })
}), { name: 'cart-store' }))

const useCartStore = () => {
  const { setCart } = CartStore(state => ({ setCart: state.setCart }))
  const { clearCart } = CartStore(state => ({ clearCart: state.clearCart }))
  const { cart } = CartStore(state => ({ cart: state.cart }))
  const { isCartOpen } = CartState(state => ({ isCartOpen: state.isCartOpen, setIsCartOpen: state.setIsCartOpen }))
  const { setIsCartOpen } = CartState(state => ({ setIsCartOpen: state.setIsCartOpen }))

  const handleIncrement = (id: string) => {
    setCart(cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)))
  }
  const handleDecrement = (id: string) => {
    const item = cart.filter(item => item.id === id)
    if (item[0]) { // if item is found in cart and quantity is 1, remove it
      if (item[0].quantity === 1) return handleRemove(id)
      setCart(cart.map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item)))
      }
  }
  const handleRemove = (id: string) => {
    setCart(cart.filter((item) => item.id !== id))
  }
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return {
    handleIncrement,
    handleDecrement,
    handleRemove,
    setCart,
    clearCart,
    cart,
    isCartOpen,
    total,
    setIsCartOpen
  }
}

export default useCartStore
