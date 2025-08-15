import type { ProductResponseData } from './product'

export interface CartItem extends ProductResponseData {
	quantity: number
}

export interface CartState {
	cartList: CartItem[]
}

export interface CartActions {
	addToCart: (product: ProductResponseData) => void
	removeFromCart: (productId: number) => void
	updateQuantity: (productId: number, quantity: number) => void
	clearCart: () => void
	getCartTotal: () => number
	getCartItemCount: () => number
}

export type CartStore = CartState & CartActions
