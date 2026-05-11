import { defineStore } from 'pinia'

export interface Toast {
	id: number
	message: string
	type: 'success' | 'info'
}

export const useToastStore = defineStore('toast', {
	state: () => ({
		toasts: [] as Toast[],
		nextId: 0
	}),
	actions: {
		show(message: string, type: Toast['type'] = 'success') {
			const id = ++this.nextId
			this.toasts.push({ id, message, type })
			setTimeout(() => {
				this.remove(id)
			}, 3000)
		},
		remove(id: number) {
			this.toasts = this.toasts.filter(t => t.id !== id)
		}
	}
})
