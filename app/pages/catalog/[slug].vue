<script setup lang="ts">
const route = useRoute()

const catalogs = ref<any[]>([])
const currentCategory = computed(() =>
	catalogs.value.find((c: any) => c.nameForLink === route.params.slug)
)

const catalogId = computed(() => currentCategory.value?.id ?? null)

$fetch('https://c5ad6c66e5034f6b.mokky.dev/catalogs').then((data: any) => {
	catalogs.value = data
})
</script>

<template>
	<Header />
	<div class="catalog-category-page section-offset">
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
						v-if="currentCategory"
						:to="'/catalog/' + currentCategory.nameForLink"
					>
						{{ currentCategory.name }}
					</NuxtLink>
					<template v-else>Загрузка...</template>
				</div>
			</div>
			<h2 class="section-title catalog-category-title">
				{{ currentCategory?.name ?? 'Загрузка...' }}
			</h2>
			<div class="catalog-category-layout">
				<CatalogSidebar />
				<CatalogProductList :catalog-id="catalogId" />
			</div>
		</div>
	</div>
	<Footer />
</template>

<style scoped lang="scss">
.breadcrumbs {
	display: flex;
	align-items: center;
	gap: 8px;
}

.breadcrumbs-back-icon {
	width: 30px;
	height: auto;
}

.breadcrumbs-text {
	font-weight: 500;
	font-size: 16px;
}

.catalog-category-title {
	margin-bottom: 40px;
}

.catalog-category-layout {
	display: grid;
	grid-template-columns: 1fr 3fr;
	gap: 20px;
}

@media (max-width: 1023px) {
	.catalog-category-layout {
		grid-template-columns: 1fr 2fr;
		gap: 16px;
	}

	.catalog-category-title {
		margin-bottom: 32px;
	}
}

@media (max-width: 767px) {
	.catalog-category-layout {
		grid-template-columns: 1fr;
		gap: 24px;
	}

	.catalog-category-title {
		margin-bottom: 24px;
	}
}

@media (max-width: 479px) {
	.catalog-category-title {
		margin-bottom: 20px;
	}
}
</style>
