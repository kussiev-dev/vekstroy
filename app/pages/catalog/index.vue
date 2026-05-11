<script setup lang="ts">
import 'vue3-carousel/carousel.css'

const { data: items } = await useFetch<any[]>(
	'https://c5ad6c66e5034f6b.mokky.dev/catalogs'
)

const carouselConfig = {
	itemsToShow: 4,
	wrapAround: true,
	autoplay: 5000,
	gap: 24,
	itemsToScroll: 1,
	snapAlign: 'start',
	transition: 500
}
</script>

<template>
	<Header />
	<div class="catalog-page section-offset">
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
				</div>
			</div>
			<h2 class="section-title catalog-title">Каталог товаров</h2>
			<div class="catalog-grid">
				<NuxtLink
					:to="'/catalog/' + slide.nameForLink"
					v-for="(slide, index) in (items ?? [])"
					:key="slide.id"
					class="catalog-card"
				>
					<div class="catalog-card-inner">
						<h4 class="catalog-card-title">
							{{ slide.name }}
						</h4>
						<NuxtImg
							:src="slide.src"
							class="catalog-card-image"
						/>
					</div>
				</NuxtLink>
			</div>
		</div>
	</div>
	<Footer />
</template>

<style scoped lang="scss">
.catalog-title {
	margin-bottom: 40px;
}

.catalog-grid {
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 24px;
}

.catalog-card {
	width: 100%;
	border: 3px solid #6fb47e;
	border-radius: 24px;
	padding: 20px;
	text-align: left;
}

.catalog-card-inner {
	width: 100%;
	height: 380px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
}

.catalog-card-title {
	font-size: 32px;
	font-weight: 600;
	width: 100%;
	text-align: left;
}

.catalog-card-image {
	align-self: flex-end;
	height: 50%;
	max-width: 100%;
}

@media (max-width: 1023px) {
	.catalog-grid {
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
	}

	.catalog-card-inner {
		height: 320px;
	}

	.catalog-card-title {
		font-size: 24px;
	}

	.catalog-card {
		padding: 16px;
		border-radius: 20px;
	}
}

@media (max-width: 767px) {
	.catalog-grid {
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}

	.catalog-card {
		padding: 12px;
		border-width: 2px;
		border-radius: 16px;
		min-height: 152px;
	}

	.catalog-card-inner {
		min-height: 152px;
		height: auto;
	}

	.catalog-card-title {
		font-size: 14px;
	}

	.catalog-card-image {
		height: 84px;
		object-fit: contain;
	}
}

@media (max-width: 479px) {
	.catalog-grid {
		grid-template-columns: repeat(2, 1fr);
		gap: 12px;
	}

	.catalog-card {
		min-height: 152px;
	}

	.catalog-card-inner {
		min-height: 152px;
	}

	.catalog-card-title {
		font-size: 14px;
	}

	.catalog-card-image {
		height: 84px;
		object-fit: contain;
	}
}
</style>
