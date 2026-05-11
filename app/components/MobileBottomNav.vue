<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useSavedStore } from '~/stores/saved'

const route = useRoute()
const cartStore = useCartStore()
const savedStore = useSavedStore()

const navItems = [
	{ to: '/', icon: 'images/house.svg', label: 'Главная' },
	{ to: '/saved', icon: 'images/saved.svg', label: 'Сохранённые' },
	{ to: '/cart', icon: 'images/cart.svg', label: 'Корзина' }
]

const savedCount = computed(() => savedStore.items.length)
const cartCount = computed(() => cartStore.totalItems)
</script>

<template>
	<nav class="mobile-bottom-nav">
		<NuxtLink
			v-for="item in navItems"
			:key="item.to"
			:to="item.to"
			class="mobile-bottom-nav-item"
			:class="{ 'mobile-bottom-nav-item--active': route.path === item.to }"
			:aria-label="item.label"
		>
			<div class="mobile-bottom-nav-icon-wrap">
				<NuxtImg
					:src="item.icon"
					:alt="item.label"
					class="mobile-bottom-nav-icon"
				/>
				<span
					v-if="item.to === '/saved' && savedCount > 0"
					class="mobile-bottom-nav-badge"
				>
					{{ savedCount }}
				</span>
				<span
					v-if="item.to === '/cart' && cartCount > 0"
					class="mobile-bottom-nav-badge"
				>
					{{ cartCount }}
				</span>
			</div>
		</NuxtLink>
	</nav>
</template>

<style scoped lang="scss">
.mobile-bottom-nav {
	display: none;
}

@media (max-width: 767px) {
	.mobile-bottom-nav {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 56px;
		background: #6fb47e;
		border-top: 1px solid rgba(0, 0, 0, 0.15);
		z-index: 100;
		padding: 0;
		padding-bottom: env(safe-area-inset-bottom, 0);
	}
}

.mobile-bottom-nav-item {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	opacity: 0.8;
	transition: opacity 0.2s;
	border-right: 2px solid rgba(0, 0, 0, 0.15);

	&:last-child {
		border-right: none;
	}

	&--active {
		opacity: 1;
	}

	&:active {
		opacity: 1;
	}
}

.mobile-bottom-nav-icon-wrap {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}

.mobile-bottom-nav-icon {
	width: 40px;
	height: 40px;
}

.mobile-bottom-nav-badge {
	position: absolute;
	top: -6px;
	right: -10px;
	min-width: 18px;
	height: 18px;
	padding: 0 4px;
	background: #0d160f;
	color: #fff;
	font-size: 11px;
	font-weight: 700;
	border-radius: 9px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
