
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

export interface CartState {
  isCartOpen: boolean
  setIsCartOpen: (isCartOpen: boolean) => void
}

export interface ICartStore {
  cart: Cart
  setCart: (cart: Cart) => void
  clearCart: () => void
}

// NO PERSIST STATE, HANDLE IF CART IS OPEN OR NOT
export const CartState = create<CartState>((set) => ({
  isCartOpen: false,
  setIsCartOpen: (isCartOpen: boolean) => set({ isCartOpen })
}))

export const CartStore = create(persist<ICartStore>((set) => ({
  cart: [],
  setCart: (cart: Cart) => set({ cart }),
  clearCart: () => set({ cart: [] })
}), { name: 'cart-store' }))


