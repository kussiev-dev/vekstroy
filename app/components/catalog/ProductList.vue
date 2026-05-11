<script setup lang="ts">
const props = defineProps<{
	catalogId: number | null
}>()

const { data: allItems } = await useFetch<any[]>(
	'https://c5ad6c66e5034f6b.mokky.dev/items'
)

const { filterProducts } = useCatalogFilters()

const items = computed(() =>
	filterProducts(allItems.value || [], props.catalogId)
)
</script>

<template>
	<div class="product-list">
		<div class="product-list-inner">
			<ProductCard
				v-for="(slide, index) in items"
				:key="slide.art ?? index"
				:images="slide.images"
				:art="slide.art"
				:name="slide.name"
				:price="slide.price"
			/>
		</div>
		<p
			v-if="items.length === 0"
			class="product-list-empty"
		>
			В этой категории пока нет товаров
		</p>
	</div>
</template>

<style scoped lang="scss">
.product-list {
	&-inner {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		column-gap: 24px;
		row-gap: 40px;
	}

	@media (max-width: 1023px) {
		&-inner {
			grid-template-columns: repeat(2, 1fr);
			column-gap: 20px;
			row-gap: 32px;
		}
	}

	@media (max-width: 767px) {
		&-inner {
			grid-template-columns: repeat(2, 1fr);
			column-gap: 16px;
			row-gap: 24px;
		}
	}

	@media (max-width: 479px) {
		&-inner {
			grid-template-columns: repeat(2, 1fr);
			row-gap: 20px;
		}
	}

	&-nav {
		width: 40px;
		height: 40px;
	}

	&-nav-icon {
		width: 100%;
		height: 100%;
		position: relative;
	}

	&-nav-icon--prev {
		right: 20px;
	}

	&-nav-icon--next {
		left: 20px;
	}

	&-empty {
		grid-column: 1 / -1;
		text-align: center;
		color: rgba(255, 255, 255, 0.7);
		font-size: 16px;
		padding: 48px 0;
	}
}
</style>
