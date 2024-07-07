
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ICartStore {
  isOpen: boolean
  SetIsOpen: (isOpen: boolean) => void
  items: any[]
  addItem: (item: any) => void
  removeItem: (item: any) => void
  clearItems: () => void
}

const useCartStore = create(persist<ICartStore>((set, get) => ({
  isOpen: false,
  SetIsOpen: (isOpen: boolean) => set(state => ({ isOpen })),
  items: [],
  addItem: (item) => set(state => ({ items: [...state.items, item] })),
  removeItem: (item) => set(state => ({ items: state.items.filter(i => i !== item) })),
  clearItems: () => set({ items: [] })
}), { name: 'cart-store' }))
