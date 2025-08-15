import { create } from 'zustand'
import type { CartStore } from '../types/cart'
import { getStorage, setStorage } from '../utils/storage'

const useCartStore = create<CartStore>((set, get) => ({
	cartList: getStorage('carts') || [],

	addToCart: (product) =>
		set((state) => {
			const existing = state.cartList.find((item) => item.id === product.id)
			let updated
			if (existing) {
				updated = state.cartList.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			} else {
				updated = [...state.cartList, { ...product, quantity: 1 }]
			}
			setStorage('carts', updated)
			return { cartList: updated }
		}),

	removeFromCart: (productId) =>
		set((state) => {
			const updated = state.cartList.filter((item) => item.id !== productId)
			setStorage('carts', updated)
			return { cartList: updated }
		}),

	updateQuantity: (productId, quantity) =>
		set((state) => {
			if (quantity < 1) return state
			const updated = state.cartList.map((item) =>
				item.id === productId ? { ...item, quantity } : item
			)
			setStorage('carts', updated)
			return { cartList: updated }
		}),

	clearCart: () => {
		setStorage('carts', [])
		set({ cartList: [] })
	},

	getCartTotal: () => {
		const state = get()
		return state.cartList.reduce(
			(total, item) => total + item.price * item.quantity,
			0
		)
	},

	getCartItemCount: () => {
		const state = get()
		return state.cartList.reduce((total, item) => total + item.quantity, 0)
	},
}))

export default useCartStore
