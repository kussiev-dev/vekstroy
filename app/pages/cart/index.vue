<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useSavedStore } from '~/stores/saved'
import { useToastStore } from '~/stores/toast'

const cartStore = useCartStore()
const savedStore = useSavedStore()
const toastStore = useToastStore()

const selectAll = ref(false)
const selectedItems = ref<Set<number>>(new Set())

function toggleSelectAll() {
	selectAll.value = !selectAll.value
	if (selectAll.value) {
		selectedItems.value = new Set(cartStore.items.map(i => i.product.art))
	} else {
		selectedItems.value.clear()
	}
}

function toggleItem(art: number) {
	if (selectedItems.value.has(art)) {
		selectedItems.value.delete(art)
		selectedItems.value = new Set(selectedItems.value)
	} else {
		selectedItems.value.add(art)
		selectedItems.value = new Set(selectedItems.value)
	}
	selectAll.value = selectedItems.value.size === cartStore.items.length
}

function toggleSaved(product: any) {
	const wasSaved = savedStore.hasItem(product.art)
	savedStore.toggleSaved(product)
	toastStore.show(
		wasSaved ? 'Товар удалён из сохранённых' : 'Товар добавлен в сохранённые'
	)
}

function removeFromCart(art: number) {
	cartStore.removeFromCart(art)
	toastStore.show('Товар удалён из корзины')
}

function removeSelectedItems() {
	const count = selectedItems.value.size
	Array.from(selectedItems.value).forEach(art => cartStore.removeFromCart(art))
	selectedItems.value = new Set()
	selectAll.value = false
	toastStore.show(
		count > 1 ? `Удалено товаров: ${count}` : 'Товар удалён из корзины'
	)
}
</script>

<template>
	<Header />
	<div class="cart">
		<div class="container">
			<div class="breadcrumbs">
				<NuxtLink
					to="/"
					class="breadcrumbs-back"
				>
					<NuxtImg
						src="images/interface/arrow-left.svg"
						class="breadcrumbs-back-icon"
					/>
				</NuxtLink>
				<div class="breadcrumbs-text">
					<NuxtLink to="/">Главная</NuxtLink>
					>
					<NuxtLink to="/cart">Корзина</NuxtLink>
				</div>
			</div>

			<div class="cart-inner">
				<h2 class="cart-title section-title">Корзина</h2>
				<p class="cart-subtitle">{{ cartStore.totalItems }} товара</p>

				<ClientOnly>
					<div
						v-if="cartStore.items.length === 0"
						class="cart-empty"
					>
						Корзина пуста. Добавьте товары из каталога.
					</div>
					<div
						v-else
						class="cart-content"
					>
						<div class="cart-list-header">
							<label class="cart-select-all">
								<input
									:checked="selectAll"
									type="checkbox"
									class="cart-select-all-input"
									@change="toggleSelectAll"
								/>
								<span class="cart-select-all-box"></span>
								<span class="cart-select-all-text">Выбрать все</span>
							</label>
							<button
								v-show="selectedItems.size > 0"
								type="button"
								class="cart-list-header-remove"
								@click="removeSelectedItems"
								aria-label="Удалить выбранные товары"
							>
								<NuxtImg
									src="/images/Interface/backet-icon.svg"
									class="cart-list-header-remove-icon"
									alt=""
								/>
							</button>
						</div>
						<div class="cart-main">
							<div class="cart-list">
								<div
									v-for="item in cartStore.items"
									:key="item.product.art"
									class="cart-item"
								>
									<label class="cart-item-checkbox">
										<input
											:checked="selectedItems.has(item.product.art)"
											type="checkbox"
											class="cart-item-checkbox-input"
											@change="toggleItem(item.product.art)"
										/>
										<span class="cart-item-checkbox-icon"></span>
									</label>
									<img
										:src="item.product.images[0]"
										class="cart-item-img"
										alt=""
									/>
									<div class="cart-item-content">
										<div class="cart-item-content-left">
											<span class="cart-item-content-left-art">
												Арт. {{ item.product.art }}
											</span>
											<NuxtLink
												:to="'/products/' + item.product.art"
												class="cart-item-content-left-name"
											>
												{{ item.product.name }}
											</NuxtLink>
											<div class="cart-item-content-left-buttons">
												<div class="cart-item-quantity">
													<button
														type="button"
														class="cart-item-quantity-btn"
														@click="
															cartStore.decreaseQuantity(item.product.art)
														"
													>
														-
													</button>
													<span class="cart-item-quantity-value">
														{{ item.quantity }}
													</span>
													<button
														type="button"
														class="cart-item-quantity-btn"
														@click="
															cartStore.increaseQuantity(item.product.art)
														"
													>
														+
													</button>
												</div>
											</div>
										</div>
										<div class="cart-item-content-right">
											<div class="cart-item-content-right-buttons">
												<button
													type="button"
													class="cart-item-content-right-btn"
													:class="{
														'cart-item-action-btn--saved': savedStore.hasItem(
															item.product.art
														)
													}"
													@click="toggleSaved(item.product)"
													:aria-label="
														savedStore.hasItem(item.product.art)
															? 'Удалить из избранного'
															: 'Добавить в избранное'
													"
												>
													<NuxtImg
														src="images/interface/heart-icon.svg"
														class="cart-item-content-right-btn-icon"
													/>
												</button>
												<button
													type="button"
													class="cart-item-content-right-btn cart-item-content-right-btn--remove"
													@click="removeFromCart(item.product.art)"
													aria-label="Удалить из корзины"
												>
													<NuxtImg
														src="/images/Interface/backet-icon.svg"
														class="cart-item-content-right-btn-icon"
														alt=""
													/>
												</button>
											</div>
											<span class="cart-item-price-unit">
												{{ item.product.price }} ₽/шт.
											</span>
										</div>
									</div>
								</div>
							</div>
							<div class="cart-total">
								<p class="cart-total-notice">
									Мы посчитаем стоимость доставки на следующем этапе
								</p>
								<div class="cart-total-row">
									<span class="cart-total-label">Итого:</span>
									<span class="cart-total-amount">
										{{ cartStore.totalPrice }} ₽
									</span>
								</div>
								<NuxtLink
									to="/checkout"
									class="cart-total-btn"
								>
									Оформить заказ
								</NuxtLink>
							</div>
						</div>
					</div>
					<template #fallback>
						<div class="cart-content">
							<div class="cart-list-header">
								<span class="cart-select-all-text">Выбрать все</span>
							</div>
							<div class="cart-main">
								<div class="cart-list">
									<div class="cart-empty">Загрузка...</div>
								</div>
								<div class="cart-total">
									<p class="cart-total-notice">
										Мы посчитаем стоимость доставки на следующем этапе
									</p>
									<div class="cart-total-row">
										<span class="cart-total-label">Итого:</span>
										<span class="cart-total-amount">0 ₽</span>
									</div>
								</div>
							</div>
						</div>
					</template>
				</ClientOnly>
			</div>
		</div>
	</div>
	<Footer />
</template>

<style scoped lang="scss">
$green: #6fb47e;

.cart {
	color: #fff;

	&-content {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	&-main {
		display: grid;
		grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
		gap: 24px;
		align-items: start;
	}

	&-subtitle {
		font-size: 16px;
		margin-bottom: 24px;
	}

	&-empty {
		padding: 48px 0;
		text-align: center;
		color: rgba(255, 255, 255, 0.7);
		font-size: 16px;
	}

	&-list {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	&-list-header {
		margin-bottom: 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&-list-header-remove {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: $green;
		border: none;
		border-radius: 100px;
		cursor: pointer;
		transition: opacity 0.2s;

		&:hover {
			opacity: 0.7;
		}
	}

	&-list-header-remove-icon {
		width: 20px;
		height: 20px;
	}

	&-select-all {
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;
		font-size: 16px;
		color: #fff;

		&-input {
			position: absolute;
			opacity: 0;
			width: 0;
			height: 0;
		}

		&-box {
			width: 40px;
			height: 40px;
			min-width: 24px;
			border: 2px solid $green;
			border-radius: 16px;
			background: transparent;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&-input:checked ~ &-box::after {
			content: '✓';
			font-size: 24px;
			color: $green;
		}

		&-text {
			color: #fff;
			font-size: 20px;
			font-style: normal;
			font-weight: 500;
			line-height: normal;
		}
	}

	&-item {
		display: flex;
		align-items: flex-start;
		gap: 16px;

		&-checkbox {
			width: 40px;
			height: 40px;
			min-width: 40px;
			flex-shrink: 0;
			border-radius: 16px;
			background-color: transparent;
			border: 2px solid $green;
			position: relative;
			cursor: pointer;
			transition: 0.2s;

			&:hover {
				background: rgba(111, 180, 126, 0.1);
			}

			&::after {
				content: '✓';
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				font-size: 24px;
				color: $green;
				opacity: 0;
				transition: 0.2s;
			}

			&-input {
				position: absolute;
				opacity: 0;
				width: 0;
				height: 0;
			}

			&:has(&-input:checked)::after {
				opacity: 1;
			}

			&:has(&-input:checked) {
				background-color: transparent;
			}
		}

		&-img {
			width: 100%;
			max-width: 217px;
			aspect-ratio: 1 / 1;
			border-radius: 12px;
			object-fit: cover;
		}

		&-content {
			flex: 1;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			gap: 24px;
		}

		&-content-left {
			display: flex;
			flex-direction: column;
			gap: 12px;

			&-art {
				font-size: 12px;
				color: rgba(255, 255, 255, 0.8);
			}

			&-name {
				font-size: 16px;
				line-height: 1.4;
				display: inline-block;
				text-decoration: none;
				color: #fff;
				transition: color 0.2s;

				&:hover {
					color: $green;
				}
			}

			&-buttons {
				display: flex;
				gap: 8px;
				align-items: center;
			}
		}

		&-content-right {
			text-align: right;
			display: flex;
			flex-direction: column;
			gap: 48px;
			align-items: flex-end;

			&-buttons {
				display: flex;
				gap: 8px;
				align-items: center;
			}

			&-btn {
				width: 40px;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				background: transparent;
				background-color: $green;
				border-radius: 100px;
				cursor: pointer;
				transition: opacity 0.2s;

				&:hover {
					opacity: 0.85;
				}
			}

			&-btn-icon {
				width: 20px;
				height: 20px;
			}
		}

		&-price-unit {
			color: #fff;
			font-size: 24px;
			font-style: normal;
			font-weight: 700;
			line-height: normal;
		}

		&-quantity {
			display: flex;
			align-items: center;
			border: 2px solid $green;
			border-radius: 14px;
			overflow: hidden;

			&-btn {
				width: 40px;
				height: 40px;
				background: transparent;
				border: none;
				cursor: pointer;
				font-size: 18px;
				font-weight: 600;
				color: $green;
				transition: 0.2s;

				&:hover {
					background: rgba(111, 180, 126, 0.15);
				}
			}

			&-value {
				min-width: 50px;
				text-align: center;
				font-size: 24px;
				font-weight: 400;
				color: #fff;
			}
		}
	}

	&-total {
		padding: 40px;
		border-radius: 24px;
		border: 2px solid $green;
		height: fit-content;
		position: sticky;
		top: calc(24px + var(--header-height));
		align-self: start;

		&-notice {
			font-size: 16px;
			margin-bottom: 40px;
		}

		&-row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 40px;
		}

		&-label {
			font-size: 36px;
			font-weight: 700;
			color: #fff;
		}

		&-amount {
			font-size: 24px;
			font-weight: 700;
			color: #fff;
		}

		&-btn {
			display: block;
			width: 100%;
			padding: 12px 24px;
			background: $green;
			color: #000;
			font-weight: 700;
			font-size: 20px;
			text-align: center;
			border-radius: 100px;
			text-decoration: none;
		}
	}
}

@media (max-width: 1023px) {
	.cart-main {
		grid-template-columns: 1fr;
		gap: 24px;
	}

	.cart-total {
		position: static;
		padding: 32px;
	}
}

@media (max-width: 767px) {
	.cart-content {
		gap: 16px;
	}

	.cart-list {
		gap: 16px;
	}

	.cart-list-header {
		margin-bottom: 12px;
	}

	.cart-select-all-text {
		font-size: 16px;
	}

	.cart-select-all-box {
		width: 32px;
		height: 32px;
		border-radius: 12px;
	}

	.cart-select-all-input:checked ~ .cart-select-all-box::after {
		font-size: 18px;
	}

	.cart-list-header-remove {
		width: 32px;
		height: 32px;
	}

	.cart-list-header-remove-icon {
		width: 16px;
		height: 16px;
	}

	.cart-item {
		gap: 12px;
	}

	.cart-item-checkbox {
		width: 32px;
		height: 32px;
		min-width: 32px;
		border-radius: 12px;
	}

	.cart-item-checkbox::after {
		font-size: 18px;
	}

	.cart-item-img {
		max-width: 120px;
		border-radius: 10px;
	}

	.cart-item-content {
		gap: 12px;
	}

	.cart-item-content-left {
		gap: 8px;
	}

	.cart-item-content-left-art {
		font-size: 10px;
	}

	.cart-item-content-left-name {
		font-size: 14px;
	}

	.cart-item-quantity {
		border-radius: 8px;
	}

	.cart-item-quantity-btn {
		width: 28px;
		height: 28px;
		font-size: 12px;
	}

	.cart-item-quantity-value {
		min-width: 32px;
		font-size: 14px;
	}

	.cart-item-content-right {
		gap: 24px;
		flex-shrink: 0;
	}

	.cart-item-content-right-buttons {
		flex-shrink: 0;
		display: flex;
		gap: 8px;
	}

	.cart-item-content-right-btn {
		width: 32px;
		height: 32px;
		min-width: 32px;
		min-height: 32px;
		flex-shrink: 0;
		border-radius: 100px;
	}

	.cart-item-content-right-btn-icon {
		width: 16px;
		height: 16px;
		display: block;
	}

	.cart-item-price-unit {
		font-size: 16px;
	}

	.cart-total {
		padding: 24px;
		border-radius: 20px;

		&-notice {
			font-size: 14px;
			margin-bottom: 24px;
		}

		&-row {
			margin-bottom: 24px;
		}

		&-label {
			font-size: 28px;
		}

		&-amount {
			font-size: 20px;
		}

		&-btn {
			font-size: 18px;
			padding: 10px 20px;
		}
	}
}

@media (max-width: 479px) {
	.cart-content {
		gap: 12px;
	}

	.cart-list {
		gap: 12px;
	}

	.cart-list-header {
		margin-bottom: 8px;
	}

	.cart-select-all-text {
		font-size: 14px;
	}

	.cart-select-all-box {
		width: 28px;
		height: 28px;
		border-radius: 10px;
	}

	.cart-select-all-input:checked ~ .cart-select-all-box::after {
		font-size: 16px;
	}

	.cart-list-header-remove {
		width: 28px;
		height: 28px;
	}

	.cart-list-header-remove-icon {
		width: 14px;
		height: 14px;
	}

	.cart-item {
		gap: 8px;
	}

	.cart-item-checkbox {
		width: 28px;
		height: 28px;
		min-width: 28px;
		border-radius: 10px;
	}

	.cart-item-checkbox::after {
		font-size: 16px;
	}

	.cart-item-img {
		max-width: 96px;
		border-radius: 8px;
	}

	.cart-item-content {
		gap: 8px;
	}

	.cart-item-content-left {
		gap: 6px;
	}

	.cart-item-content-left-art {
		font-size: 9px;
	}

	.cart-item-content-left-name {
		font-size: 12px;
	}

	.cart-item-quantity {
		border-radius: 6px;
	}

	.cart-item-quantity-btn {
		width: 24px;
		height: 24px;
		font-size: 10px;
	}

	.cart-item-quantity-value {
		min-width: 28px;
		font-size: 12px;
	}

	.cart-item-content-right {
		gap: 16px;
		flex-shrink: 0;
		min-width: 0;
	}

	.cart-item-content-right-buttons {
		flex-shrink: 0;
		display: flex;
		gap: 8px;
	}

	.cart-item-content-right-btn {
		width: 28px;
		height: 28px;
		min-width: 28px;
		min-height: 28px;
		flex-shrink: 0;
	}

	.cart-item-content-right-btn-icon {
		width: 14px;
		height: 14px;
		display: block;
	}

	.cart-item-price-unit {
		font-size: 14px;
	}

	.cart-total {
		padding: 20px;
		border-radius: 16px;

		&-notice {
			margin-bottom: 20px;
		}

		&-label {
			font-size: 24px;
		}

		&-amount {
			font-size: 18px;
		}

		&-btn {
			font-size: 16px;
		}
	}
}
</style>
