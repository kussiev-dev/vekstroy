import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
	state: () => ({
		items: [] as Array<{ product: any; quantity: number }>
	}),
	getters: {
		totalPrice: state =>
			state.items.reduce(
				(acc, item) => acc + item.product.price * item.quantity,
				0
			),
		totalItems: state =>
			state.items.reduce((acc, item) => acc + item.quantity, 0)
	},
	actions: {
		// Добавить товар в корзину
		addToCart(product: any) {
			const existing = this.items.find(item => item.product.art === product.art)
			if (existing) {
				existing.quantity++
			} else {
				this.items.push({ product, quantity: 1 })
			}
		},

		// Увеличить количество
		increaseQuantity(art: number) {
			const item = this.items.find(i => i.product.art === art)
			if (item) item.quantity++
		},

		// Уменьшить количество
		decreaseQuantity(art: number) {
			const item = this.items.find(i => i.product.art === art)
			if (item) {
				item.quantity--
				if (item.quantity <= 0) this.removeFromCart(art)
			}
		},

		// Удалить товар
		removeFromCart(art: number) {
			this.items = this.items.filter(i => i.product.art !== art)
		},

		// Очистить корзину
		clearCart() {
			this.items = []
		}
	}
})
