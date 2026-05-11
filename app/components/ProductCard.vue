<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useSavedStore } from '~/stores/saved'
import { useToastStore } from '~/stores/toast'

const props = defineProps<{
	images: string[]
	art: number
	name: string
	price: number
}>()

const cartStore = useCartStore()
const savedStore = useSavedStore()
const toastStore = useToastStore()

const product = computed(() => ({
	images: props.images,
	art: props.art,
	name: props.name,
	price: props.price
}))

function addToCart() {
	cartStore.addToCart(product.value)
	toastStore.show('Товар добавлен в корзину')
}

function toggleSaved(e: Event) {
	e.preventDefault()
	const wasSaved = savedStore.hasItem(props.art)
	savedStore.toggleSaved(product.value)
	toastStore.show(
		wasSaved ? 'Товар удалён из сохранённых' : 'Товар добавлен в сохранённые'
	)
}

const isSaved = computed(() => savedStore.hasItem(props.art))
</script>

<template>
	<div class="product-card">
		<!-- верхняя часть карточки -->
		<div class="product-card-top">
			<NuxtImg
				v-if="images && images.length"
				:src="images[0]"
				class="product-card-image"
			/>
		</div>

		<!-- нижняя часть карточки -->
		<div class="product-card-bottom">
			<span class="product-card-art">Арт. {{ art }}</span>
			<NuxtLink
				:to="'/products/' + art"
				class="product-card-name"
			>
				{{ name }}
			</NuxtLink>
			<h4 class="product-card-price">{{ price }} ₽/шт.</h4>
			<div class="product-card-buttons">
				<button
					class="product-card-button product-card-button--primary"
					@click="addToCart"
				>
					В корзину
				</button>
				<button
					type="button"
					class="product-card-button product-card-button--icon"
					:class="{ 'product-card-button--saved': isSaved }"
					@click="toggleSaved"
					:aria-label="
						isSaved ? 'Удалить из избранного' : 'Добавить в избранное'
					"
				>
					<NuxtImg
						src="images/interface/heart-icon.svg"
						class="product-card-fav-icon"
					/>
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.product-card {
	width: 100%;
	max-width: 330px;
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.product-card-top {
	width: 100%;
}

.product-card-image {
	display: block;
	width: 100%;
	height: auto;
	border-top-left-radius: 24px;
	border-top-right-radius: 24px;
}

.product-card-bottom {
	display: flex;
	flex-direction: column;
}

.product-card-art {
	font-size: 12px;
	opacity: 0.8;
	margin-bottom: 8px;
}

.product-card-name {
	font-size: 16px;
	margin-bottom: 16px;
	display: inline-block;
}

.product-card-price {
	font-size: 24px;
	font-weight: 700;
	margin-bottom: 24px;
}

.product-card-buttons {
	display: flex;
	width: 100%;
	gap: 8px;
	height: 50px;
	color: #000;
}

.product-card-button {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	background-color: #6fb47e;
	cursor: pointer;
	border: none;
	transition: opacity 0.2s;

	&:hover {
		opacity: 0.7;
	}
}

.product-card-name {
	transition: color 0.2s;

	&:hover {
		color: #6fb47e;
	}
}

.product-card-button--primary {
	flex: 1 1 0;
	text-align: center;
	font-weight: 700;
	font-size: 20px;
	border-bottom-left-radius: 24px;
}

.product-card-button--icon {
	flex: 0 0 60px;
	border-bottom-right-radius: 24px;
}

.product-card-button--saved {
	opacity: 0.9;
	background-color: #5a9a68;
}

.product-card-fav-icon {
	width: 20px;
	height: 20px;
}

@media (max-width: 479px) {
	.product-card {
		max-width: 100%;
	}

	.product-card-art {
		font-size: 10px;
		margin-bottom: 8px;
	}

	.product-card-name {
		font-size: 12px;
		margin-bottom: 10px;
	}

	.product-card-price {
		font-size: 16px;
		margin-bottom: 12px;
	}

	.product-card-buttons {
		height: 24px;
		gap: 4px;
	}

	.product-card-button--primary {
		font-size: 12px;
	}

	.product-card-button--icon {
		flex: 0 0 32px;
		width: 32px;
	}

	.product-card-fav-icon {
		width: 10px;
		height: 10px;
	}

	.product-card-image {
		border-top-left-radius: 16px;
		border-top-right-radius: 16px;
	}

	.product-card-button--primary {
		border-bottom-left-radius: 16px;
	}

	.product-card-button--icon {
		border-bottom-right-radius: 16px;
	}
}
</style>
