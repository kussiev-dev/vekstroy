<script setup lang="ts">
import { useToastStore } from '~/stores/toast'

const toastStore = useToastStore()
</script>

<template>
	<Teleport to="body">
		<div class="toast-container">
			<TransitionGroup name="toast">
				<div
					v-for="toast in toastStore.toasts"
					:key="toast.id"
					class="toast"
					:class="'toast--' + toast.type"
				>
					{{ toast.message }}
				</div>
			</TransitionGroup>
		</div>
	</Teleport>
</template>

<style scoped lang="scss">
$green: #6fb47e;

.toast-container {
	position: fixed;
	top: 24px;
	right: 24px;
	z-index: 9999;
	display: flex;
	flex-direction: column;
	gap: 12px;
	pointer-events: none;
}

.toast {
	padding: 16px 24px;
	background: #0d160f;
	border: 2px solid $green;
	border-radius: 16px;
	color: #fff;
	font-size: 16px;
	font-weight: 500;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.toast--success {
	border-color: $green;
}

.toast--info {
	border-color: rgba(255, 255, 255, 0.5);
}

.toast-enter-active,
.toast-leave-active {
	transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
	opacity: 0;
	transform: translateX(100%);
}

.toast-move {
	transition: transform 0.3s ease;
}

@media (max-width: 767px) {
	.toast-container {
		top: 16px;
		right: 16px;
		left: 16px;
		align-items: stretch;
	}

	.toast {
		padding: 12px 16px;
		font-size: 14px;
	}
}

@media (max-width: 479px) {
	.toast-container {
		top: 12px;
		right: 12px;
		left: 12px;
	}

	.toast {
		padding: 10px 14px;
		font-size: 13px;
	}
}
</style>
