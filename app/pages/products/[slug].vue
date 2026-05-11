<script setup lang="ts">
const route = useRoute()
import { ref } from 'vue'
import 'vue3-carousel/carousel.css'
import { useCartStore } from '~/stores/cart'
import { useSavedStore } from '~/stores/saved'
import { useToastStore } from '~/stores/toast'

const { data }: any = await useFetch(
	`https://c5ad6c66e5034f6b.mokky.dev/items?art=${route.params.slug}`
)

const { data: catalogs } = await useFetch<any[]>(
	'https://c5ad6c66e5034f6b.mokky.dev/catalogs'
)

const { data: allItems } = await useFetch<any[]>(
	'https://c5ad6c66e5034f6b.mokky.dev/items'
)

const item = computed(() => data.value?.[0])

const alsoBoughtItems = computed(() => {
	const current = item.value
	if (!current || !allItems.value) return []
	return (allItems.value || [])
		.filter((p: any) => p.art !== current.art)
		.slice(0, 4)
})

const productCategory = computed(() => {
	if (!item.value?.catalogId || !catalogs.value) return null
	return catalogs.value.find((c: any) => c.id === item.value.catalogId)
})
const cartStore = useCartStore()
const savedStore = useSavedStore()
const toastStore = useToastStore()

const currentSlide = ref(0)

function addToCart() {
	if (item.value) {
		cartStore.addToCart(item.value)
		toastStore.show('Товар добавлен в корзину')
	}
}

function toggleSaved(e: Event) {
	e.preventDefault()
	if (item.value) {
		const wasSaved = savedStore.hasItem(item.value.art)
		savedStore.toggleSaved(item.value)
		toastStore.show(
			wasSaved ? 'Товар удалён из сохранённых' : 'Товар добавлен в сохранённые'
		)
	}
}

const isSaved = computed(() =>
	item.value ? savedStore.hasItem(item.value.art) : false
)

const slideTo = (nextSlide: any) => (currentSlide.value = nextSlide)

const galleryConfig = {
	itemsToShow: 1,
	wrapAround: true,
	slideEffect: 'fade',
	mouseDrag: false,
	touchDrag: false,
	height: 320
}

const thumbnailsConfig = {
	dir: 'ttb',
	// height: 450,
	itemsToShow: 4,
	wrapAround: true,
	touchDrag: false,
	gap: 10
}
</script>

<template>
	<Header />
	<div class="product-page section-offset">
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
					<NuxtLink to="/catalog">Каталог</NuxtLink>
					>
					<NuxtLink
						v-if="productCategory"
						:to="'/catalog/' + productCategory.nameForLink"
					>
						{{ productCategory.name }}
					</NuxtLink>
					<template v-else-if="item">Категория</template>
					>
					<NuxtLink
						v-if="item"
						:to="'/products/' + item.art"
					>
						{{ item.name }}
					</NuxtLink>
				</div>
			</div>

			<template v-if="!item">
				<p
					v-if="data !== undefined"
					class="product-empty"
				>
					Товар не найден
				</p>
				<p
					v-else
					class="product-empty"
				>
					Загрузка...
				</p>
			</template>
			<template v-else>
				<div class="product-inner section-offset">
					<h2 class="product-title">{{ item.name }}</h2>
					<div class="product-content">
						<div class="product-left">
							<!-- thumbnails -->
							<div class="product-thumbs">
								<div
									v-for="(image, i) in item.images"
									:key="i"
									class="product-thumb"
									:class="{ active: i === currentSlide }"
									@click="slideTo(i)"
								>
									<img :src="image" />
								</div>
							</div>

							<!-- main image -->
							<div class="product-main">
								<img :src="item.images[currentSlide]" />
							</div>
						</div>

						<div class="product-right">
							<p class="product-subtitle">
								независимая, конфорок - 4 шт, панель - стеклокерамика, 7400 Вт
								<span class="more">подробнее</span>
							</p>

							<div class="product-buy">
								<div class="product-price">{{ item.price }} ₽/шт.</div>
								<button
									type="button"
									class="product-fav"
									:class="{ 'product-fav--saved': isSaved }"
									@click="toggleSaved"
									:aria-label="
										isSaved ? 'Удалить из избранного' : 'Добавить в избранное'
									"
								>
									<NuxtImg
										src="images/interface/heart-icon.svg"
										class="product-fav-icon"
									/>
								</button>
								<button
									type="button"
									class="product-cart"
									@click="addToCart"
								>
									В корзину
								</button>
							</div>

							<div
								v-if="item?.stock"
								class="product-stock"
							>
								<p>В наличии на складах:</p>
								<ul>
									<li
										v-for="warehouse in [
											'Назрань-1',
											'Назрань-2',
											'Карабулак',
											'Магас'
										]"
										:key="warehouse"
										:class="{ ok: item.stock[warehouse] }"
									>
										<NuxtImg
											:src="
												item.stock[warehouse]
													? 'images/interface/ok.svg'
													: 'images/interface/no.svg'
											"
										/>
										<span>{{ warehouse }}</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div
					v-if="alsoBoughtItems.length > 0"
					class="product-also-bought section-offset"
				>
					<h3 class="product-also-bought-title section-title">
						Также покупают
					</h3>
					<div class="product-also-bought-grid">
						<ProductCard
							v-for="(product, index) in alsoBoughtItems"
							:key="product.art ?? index"
							:images="product.images"
							:art="product.art"
							:name="product.name"
							:price="product.price"
						/>
					</div>
				</div>

				<div
					v-if="item?.description"
					class="product-description"
				>
					<h3 class="product-description-title section-title">Описание</h3>
					<div
						class="product-description-content"
						v-html="item.description"
					></div>
				</div>
			</template>
		</div>
	</div>
	<Footer />
</template>

<style scoped lang="scss">
.product-empty {
	text-align: center;
	color: rgba(255, 255, 255, 0.7);
	font-size: 16px;
	padding: 48px 0;
}

.product {
	&-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
	}

	&-title {
		font-size: 40px;
		font-weight: 700;
		margin-bottom: 12px;
	}

	/* LEFT */

	&-left {
		display: flex;
		gap: 24px;
	}

	&-thumbs {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	&-thumb {
		width: 100px;
		height: 100px;
		border-radius: 16px;
		overflow: hidden;
		opacity: 0.6;
		cursor: pointer;
		border: 2px solid transparent;
		transition:
			opacity 0.2s,
			border-color 0.2s;

		&:hover {
			opacity: 0.7;
		}
	}

	&-thumb.active {
		opacity: 1;
		border-color: #6fb47e;
	}

	&-thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	&-main {
		flex: 1;
		border-radius: 24px;
		overflow: hidden;
	}

	&-main img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	/* RIGHT */

	&-subtitle {
		font-size: 14px;
		margin-bottom: 24px;
	}

	&-subtitle .more {
		text-decoration: underline;
		cursor: pointer;
	}

	&-buy {
		display: flex;
		align-items: center;
		border-radius: 999px;
		overflow: hidden;
		height: 50px;
		margin-bottom: 32px;
		gap: 8px;
	}

	&-price {
		height: 100%;
		flex-grow: 1;
		text-align: center;
		font-size: 24px;
		font-weight: 700;
		color: #000;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #6fb47e;
	}

	&-fav {
		width: 60px;
		height: 100%;
		font-size: 24px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #6fb47e;
		border: none;
		cursor: pointer;
		transition: opacity 0.2s;

		&:hover {
			opacity: 0.7;
		}

		&--saved {
			background: #5a9a68;
		}

		&-icon {
			width: 20px;
			height: 20px;
		}
	}

	&-cart {
		flex-grow: 1;
		height: 100%;
		border: none;
		font-size: 20px;
		font-weight: 700;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		color: black;
		background: #6fb47e;
		transition: opacity 0.2s;

		&:hover {
			opacity: 0.7;
		}
	}

	/* STOCK */

	&-stock {
		display: flex;
		flex-direction: column;
		gap: 8px;

		p {
			font-weight: 600;
		}

		ul {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}

		li {
			display: flex;
			align-items: center;
			gap: 8px;
			opacity: 0.7;

			&.ok {
				opacity: 1;
			}

			img {
				width: 20px;
				height: 20px;
			}
		}
	}
}

@media (max-width: 1023px) {
	.product-content {
		gap: 20px;
	}

	.product-left {
		gap: 16px;
	}

	.product-thumb {
		width: 80px;
		height: 80px;
	}

	.product-title {
		font-size: 32px;
	}

	.product-price {
		font-size: 20px;
	}
}

@media (max-width: 767px) {
	.product-content {
		grid-template-columns: 1fr;
		gap: 24px;
	}

	.product-left {
		flex-direction: column-reverse;
		gap: 12px;
	}

	.product-thumbs {
		flex-direction: row;
		gap: 12px;
		overflow-x: auto;
		padding-bottom: 8px;
	}

	.product-thumb {
		width: 72px;
		height: 72px;
		min-width: 72px;
		border-radius: 12px;
	}

	.product-main {
		border-radius: 16px;
	}

	.product-title {
		font-size: 28px;
	}

	.product-subtitle {
		font-size: 13px;
		margin-bottom: 20px;
	}

	.product-buy {
		height: 48px;
		margin-bottom: 24px;
		gap: 4px;
	}

	.product-price {
		font-size: 20px;
	}

	.product-fav {
		width: 50px;
	}

	.product-cart {
		font-size: 16px;
	}
}

.product-also-bought-title,
.product-description-title {
	font-size: 40px;
	font-weight: 600;
	margin-bottom: 40px;
}

.product-also-bought-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 24px;
}

.product-description-content {
	font-size: 16px;
	line-height: 1.6;
	color: rgba(255, 255, 255, 0.9);

	p {
		margin: 0 0 12px;

		&:last-child {
			margin-bottom: 0;
		}
	}
}

@media (max-width: 1023px) {
	.product-also-bought-title,
	.product-description-title {
		font-size: 32px;
		margin-bottom: 32px;
	}

	.product-also-bought-grid {
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
	}

	.product-description-content {
		font-size: 15px;
	}
}

@media (max-width: 767px) {
	.product-also-bought-title,
	.product-description-title {
		font-size: 28px;
		margin-bottom: 24px;
	}

	.product-also-bought-grid {
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}

	.product-description-content {
		font-size: 14px;
	}
}

@media (max-width: 479px) {
	.product-also-bought-title,
	.product-description-title {
		font-size: 22px;
		margin-bottom: 20px;
	}

	.product-also-bought-grid {
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}

	.product-description-content {
		font-size: 14px;
	}

	.product-title {
		font-size: 22px;
	}

	.product-thumb {
		width: 60px;
		height: 60px;
		min-width: 60px;
	}

	.product-buy {
		height: 44px;
		flex-wrap: wrap;
		gap: 4px;
	}

	.product-price {
		font-size: 18px;
	}

	.product-cart {
		font-size: 14px;
	}
}
</style>
