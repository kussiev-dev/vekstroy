<script setup lang="ts">
const route = useRoute()
const searchQuery = computed(() => String(route.query.q || '').trim())

const { data: allItems } = await useFetch<any[]>(
	'https://c5ad6c66e5034f6b.mokky.dev/items'
)
const { data: allCatalogs } = await useFetch<any[]>(
	'https://c5ad6c66e5034f6b.mokky.dev/catalogs'
)

const filteredProducts = computed(() => {
	const q = searchQuery.value.toLowerCase()
	if (!q || q.length < 2) return []

	return (allItems.value || []).filter(
		(p: any) =>
			(p.name || '').toLowerCase().includes(q) ||
			String(p.art || '').includes(q)
	)
})

const filteredCatalogs = computed(() => {
	const q = searchQuery.value.toLowerCase()
	if (!q || q.length < 2) return []

	return (allCatalogs.value || []).filter(
		(c: any) =>
			(c.name || '').toLowerCase().includes(q) ||
			(c.nameForLink || '').toLowerCase().includes(q)
	)
})

const hasResults = computed(
	() => filteredProducts.value.length > 0 || filteredCatalogs.value.length > 0
)
</script>

<template>
	<Header />
	<div class="search-page">
		<div class="container">
			<div class="breadcrumbs">
				<NuxtLink to="/" class="breadcrumbs-back">
					<NuxtImg src="images/interface/arrow-left.svg" class="breadcrumbs-back-icon" />
				</NuxtLink>
				<div class="breadcrumbs-text">
					<NuxtLink to="/">Главная</NuxtLink>
					&gt;
					<NuxtLink to="/search">Поиск</NuxtLink>
					&gt;
					<span v-if="searchQuery">{{ searchQuery }}</span>
					<span v-else>Введите запрос</span>
				</div>
			</div>

			<div class="search-page-inner section-offset">
				<h1 class="search-page-title section-title">
					Результаты поиска
					<span v-if="searchQuery">«{{ searchQuery }}»</span>
				</h1>

				<div v-if="searchQuery.length < 2" class="search-page-empty">
					Введите минимум 2 символа для поиска
				</div>

				<div v-else-if="!hasResults" class="search-page-empty">
					По запросу «{{ searchQuery }}» ничего не найдено
				</div>

				<div v-else class="search-page-content">
					<section v-if="filteredCatalogs.length > 0" class="search-page-section">
						<h2 class="search-page-section-title">Категории</h2>
						<div class="search-page-catalogs">
							<NuxtLink
								v-for="cat in filteredCatalogs"
								:key="cat.id"
								:to="'/catalog/' + cat.nameForLink"
								class="search-page-catalog-card"
							>
								<NuxtImg
									v-if="cat.src"
									:src="cat.src"
									class="search-page-catalog-img"
									alt=""
								/>
								<span class="search-page-catalog-name">{{ cat.name }}</span>
							</NuxtLink>
						</div>
					</section>

					<section v-if="filteredProducts.length > 0" class="search-page-section">
						<h2 class="search-page-section-title">Товары</h2>
						<div class="search-page-products">
							<ProductCard
								v-for="(product, index) in filteredProducts"
								:key="product.art ?? index"
								:images="product.images"
								:art="product.art"
								:name="product.name"
								:price="product.price"
							/>
						</div>
					</section>
				</div>
			</div>
		</div>
	</div>
	<Footer />
</template>

<style scoped lang="scss">
$green: #6fb47e;

.search-page {
	color: #fff;

	.breadcrumbs {
		margin-bottom: 24px;
	}

	&-inner {
		padding-top: 0;
	}

	&-title {
		margin-bottom: 40px;

		span {
			color: $green;
		}
	}

	&-empty {
		padding: 48px 0;
		text-align: center;
		color: rgba(255, 255, 255, 0.7);
		font-size: 18px;
	}

	&-content {
		display: flex;
		flex-direction: column;
		gap: 48px;
	}

	&-section {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	&-section-title {
		font-size: 24px;
		font-weight: 600;
		color: $green;
		margin: 0;
	}

	&-catalogs {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 16px;
	}

	&-catalog-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		padding: 24px;
		border: 2px solid $green;
		border-radius: 16px;
		text-decoration: none;
		color: #fff;
		transition: background 0.2s;

		&:hover {
			background: rgba(111, 180, 126, 0.1);
		}
	}

	&-catalog-img {
		width: 80px;
		height: 80px;
		object-fit: contain;
	}

	&-catalog-name {
		font-size: 16px;
		font-weight: 500;
		text-align: center;
	}

	&-products {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}
}

@media (max-width: 1023px) {
	.search-page-products {
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
	}

	.search-page-catalogs {
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
	}
}

@media (max-width: 767px) {
	.search-page-title {
		margin-bottom: 24px;
	}

	.search-page-section-title {
		font-size: 20px;
	}

	.search-page-catalog-card {
		padding: 16px;
	}

	.search-page-catalog-img {
		width: 60px;
		height: 60px;
	}

	.search-page-catalog-name {
		font-size: 14px;
	}

	.search-page-products {
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}
}

@media (max-width: 479px) {
	.search-page-products {
		grid-template-columns: 1fr;
	}

	.search-page-catalogs {
		grid-template-columns: 1fr;
	}
}
</style>
