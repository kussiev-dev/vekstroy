import { defineStore } from 'pinia'

export const useSavedStore = defineStore('saved', {
	state: () => ({
		items: [] as Array<{ product: any }>
	}),
	getters: {
		hasItem: state => (art: number) =>
			state.items.some(item => item.product.art === art)
	},
	actions: {
		toggleSaved(product: any) {
			const existing = this.items.find(item => item.product.art === product.art)
			if (existing) {
				this.items = this.items.filter(i => i.product.art !== product.art)
			} else {
				this.items.push({ product })
			}
		},

		addToSaved(product: any) {
			const existing = this.items.find(item => item.product.art === product.art)
			if (!existing) {
				this.items.push({ product })
			}
		},

		removeFromSaved(art: number) {
			this.items = this.items.filter(i => i.product.art !== art)
		}
	}
})
