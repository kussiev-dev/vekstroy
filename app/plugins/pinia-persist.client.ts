export default defineNuxtPlugin({
	name: 'pinia-persist',
	enforce: 'post',
	setup(nuxtApp) {
		if (!import.meta.client) return

		const pinia = nuxtApp.$pinia
		if (!pinia) return

		// Гидрируем cart из localStorage
		try {
			const cartData = localStorage.getItem('cart')
			if (cartData) {
				const parsed = JSON.parse(cartData)
				pinia.state.value = pinia.state.value || {}
				pinia.state.value.cart = parsed
			}
		} catch {
			// ignore
		}

		// Гидрируем saved из localStorage
		try {
			const savedData = localStorage.getItem('saved')
			if (savedData) {
				const parsed = JSON.parse(savedData)
				pinia.state.value = pinia.state.value || {}
				pinia.state.value.saved = parsed
			}
		} catch {
			// ignore
		}

		// Сохраняем в localStorage при любых изменениях
		const cartStore = useCartStore(pinia)
		const savedStore = useSavedStore(pinia)

		cartStore.$subscribe((_, state) => {
			localStorage.setItem('cart', JSON.stringify(state))
		})
		savedStore.$subscribe((_, state) => {
			localStorage.setItem('saved', JSON.stringify(state))
		})
	},
})
