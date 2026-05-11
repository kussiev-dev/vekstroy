<script setup lang="ts">
import { useSavedStore } from '~/stores/saved'
import { useCartStore } from '~/stores/cart'
import { useToastStore } from '~/stores/toast'

const savedStore = useSavedStore()
const cartStore = useCartStore()
const toastStore = useToastStore()

function addToCart(product: any) {
	cartStore.addToCart(product)
	toastStore.show('Товар добавлен в корзину')
}

function removeFromSaved(art: number) {
	savedStore.removeFromSaved(art)
	toastStore.show('Товар удалён из сохранённых')
}
</script>

<template>
	<Header />
	<div class="saved">
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
					&gt;
					<NuxtLink to="/saved">Сохранённые</NuxtLink>
				</div>
			</div>

			<div class="saved-inner">
				<h2 class="saved-title section-title">Сохранённые товары</h2>
				<p class="saved-subtitle">{{ savedStore.items.length }} товара</p>

				<ClientOnly>
					<div v-if="savedStore.items.length === 0" class="saved-empty">
						Список сохранённых товаров пуст. Добавьте товары, нажав на сердечко в
						карточке товара.
					</div>
					<div
						v-else
						class="saved-content"
					>
						<div class="saved-list">
							<div
								v-for="item in savedStore.items"
								:key="item.product.art"
								class="saved-item"
							>
								<div class="saved-item-img-wrap">
									<NuxtImg
										:src="item.product.images[0]"
										class="saved-item-img"
										alt=""
									/>
								</div>
								<div class="saved-item-content">
									<div class="saved-item-content-left">
										<span class="saved-item-content-left-art">
											Арт. {{ item.product.art }}
										</span>
										<NuxtLink
											:to="'/products/' + item.product.art"
											class="saved-item-content-left-name"
										>
											{{ item.product.name }}
										</NuxtLink>
										<span class="saved-item-price saved-item-price--mobile">
											{{ item.product.price }} ₽/шт.
										</span>
										<div class="saved-item-content-left-buttons">
											<button
												class="saved-item-btn saved-item-btn--primary"
												@click.prevent="addToCart(item.product)"
											>
												В корзину
											</button>
											<button
												class="saved-item-btn saved-item-btn--icon"
												@click.prevent="removeFromSaved(item.product.art)"
												aria-label="Удалить из сохранённых"
											>
												<NuxtImg
													src="images/interface/backet-icon.svg"
													class="saved-item-btn-icon"
													alt=""
												/>
											</button>
										</div>
									</div>
									<div class="saved-item-content-right">
										<span class="saved-item-price">
											{{ item.product.price }} ₽/шт.
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<template #fallback>
						<div class="saved-content">
							<div class="saved-empty">Загрузка...</div>
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

.saved {
	color: #fff;

	&-content {
		display: flex;
		flex-direction: column;
		gap: 24px;
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

	&-item {
		display: flex;
		align-items: flex-start;
		gap: 16px;

		&-img-wrap {
			display: contents;
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
			align-items: flex-end;
		}

		&-price {
			font-size: 24px;
			font-weight: 700;
			color: #fff;
			line-height: normal;

			&--mobile {
				display: none;
			}
		}

		&-btn {
			cursor: pointer;
			border: none;
			transition: 0.2s;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;

			&--primary {
				padding: 0 24px;
				background-color: $green;
				color: #000;
				font-size: 16px;
				font-weight: 600;
				border-radius: 100px;

				&:hover {
					opacity: 0.7;
				}
			}

			&--icon {
				width: 40px;
				background-color: $green;
				border-radius: 100px;

				&:hover {
					opacity: 0.7;
				}
			}

			&-icon {
				width: 20px;
				height: 20px;
			}
		}
	}
}

@media (max-width: 767px) {
	.saved-list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}

	.saved-item {
		flex-direction: column;
		gap: 8px;
		align-items: stretch;
	}

	.saved-item-img-wrap {
		display: block;
		width: 100%;
		overflow: hidden;
		border-top-left-radius: 24px;
		border-top-right-radius: 24px;
	}

	.saved-item-img {
		max-width: 100%;
		width: 100%;
		aspect-ratio: 1;
		display: block;
		object-fit: cover;
		border-radius: 0;
	}

	.saved-item-content {
		flex-direction: column;
		gap: 12px;
		flex: none;
		width: 100%;
		min-width: 0;
	}

	.saved-item-content-left {
		gap: 0;
		width: 100%;
	}

	.saved-item-content-left-art {
		font-size: 12px;
		margin-bottom: 8px;
	}

	.saved-item-content-left-name {
		font-size: 16px;
		margin-bottom: 16px;
	}

	.saved-item-content-right {
		display: none;
	}

	.saved-item-price--mobile {
		display: block !important;
		font-size: 24px;
		margin-bottom: 24px;
	}

	.saved-item-content-left-buttons {
		display: flex;
		width: 100%;
		min-width: 0;
		gap: 4px;
		height: 50px;
		color: #000;
	}

	.saved-item-btn {
		height: 50px;
	}

	.saved-item-btn--primary {
		flex: 1 1 0;
		text-align: center;
		font-weight: 700;
		font-size: 20px;
		padding: 0;
		border-radius: 0;
		border-bottom-left-radius: 24px;
	}

	.saved-item-btn--icon {
		flex: 0 0 60px;
		width: 60px;
		border-radius: 0;
		border-bottom-right-radius: 24px;
	}

	.saved-item-btn-icon {
		width: 20px;
		height: 20px;
	}
}

@media (max-width: 479px) {
	.saved-item-img-wrap {
		border-top-left-radius: 16px;
		border-top-right-radius: 16px;
	}

	.saved-item-content-left-art {
		font-size: 10px;
		margin-bottom: 8px;
	}

	.saved-item-content-left-name {
		font-size: 12px;
		margin-bottom: 10px;
	}

	.saved-item-price--mobile {
		font-size: 16px;
		margin-bottom: 12px;
	}

	.saved-item-content-left-buttons {
		height: 44px;
		min-height: 44px;
		gap: 8px;
	}

	.saved-item-btn {
		height: 44px;
		min-height: 44px;
	}

	.saved-item-btn--primary {
		font-size: 14px;
		border-bottom-left-radius: 16px;
	}

	.saved-item-btn--icon {
		flex: 0 0 44px;
		width: 44px;
		min-width: 44px;
		border-bottom-right-radius: 16px;
	}

	.saved-item-btn-icon {
		width: 20px;
		height: 20px;
	}
}
</style>
