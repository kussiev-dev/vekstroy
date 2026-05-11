<script setup lang="ts">
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/carousel.css'

const items = ref<any[]>([])

$fetch('https://c5ad6c66e5034f6b.mokky.dev/catalogs').then((data: any) => {
	items.value = data
})

const carouselConfig = {
	itemsToShow: 4,
	wrapAround: true,
	autoplay: 5000,
	gap: 24,
	itemsToScroll: 1,
	snapAlign: 'start' as const,
	transition: 500,
	breakpoints: {
		320: { itemsToShow: 2.5, gap: 12 },
		480: { itemsToShow: 2.5, gap: 16 },
		768: { itemsToShow: 3, gap: 20 },
		1024: { itemsToShow: 4, gap: 24 }
	}
}
</script>

<template>
	<div class="catalog-slider section-offset">
		<div class="container">
			<div class="catalog-slider-inner">
				<Carousel v-bind="carouselConfig">
					<Slide
						v-for="(slide, index) in items"
						:key="slide.id ?? index"
						class="catalog-slider-slide"
					>
						<NuxtLink
							:to="'/catalog/' + slide.nameForLink"
							class="catalog-slider-card"
						>
							<h4 class="catalog-slider-card-title">
								{{ slide.name }}
							</h4>
							<NuxtImg
								:src="slide.src"
								class="catalog-slider-card-image"
							/>
						</NuxtLink>
					</Slide>

					<template #addons>
						<Navigation class="catalog-slider-nav">
							<template #prev>
								<NuxtImg
									src="images/interface/arrow-left.svg"
									class="catalog-slider-nav-icon catalog-slider-nav-icon--prev"
								/>
							</template>
							<template #next>
								<NuxtImg
									src="images/interface/arrow-right.svg"
									class="catalog-slider-nav-icon catalog-slider-nav-icon--next"
								/>
							</template>
						</Navigation>
					</template>
				</Carousel>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.catalog-slider-inner {
	width: 100%;
}

.catalog-slider-slide {
	width: 100%;
	border: 3px solid #6fb47e;
	border-radius: 24px;
	padding: 20px;
	text-align: left;
}

.catalog-slider-card {
	width: 100%;
	height: 380px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
}

.catalog-slider-card-title {
	font-size: 32px;
	font-weight: 600;
	width: 100%;
	text-align: left;
}

@media (max-width: 1023px) {
	.catalog-slider-card {
		height: 320px;
	}

	.catalog-slider-card-title {
		font-size: 24px;
	}

	.catalog-slider-slide {
		padding: 16px;
		border-radius: 20px;
	}
}

@media (max-width: 767px) {
	.catalog-slider-card {
		min-height: 152px;
		height: auto;
	}

	.catalog-slider-card-title {
		font-size: 14px;
	}

	.catalog-slider-card-image {
		height: 84px;
		object-fit: contain;
	}

	.catalog-slider-slide {
		padding: 12px;
		border-width: 2px;
		border-radius: 16px;
	}
}

@media (max-width: 479px) {
	.catalog-slider-card {
		min-height: 152px;
	}

	.catalog-slider-card-title {
		font-size: 14px;
	}

	.catalog-slider-card-image {
		height: 84px;
	}
}

.catalog-slider-card-image {
	align-self: flex-end;
	height: 50%;
	max-width: 100%;
}

.catalog-slider-nav {
	width: 40px;
	height: 40px;
}

.catalog-slider-nav-icon {
	width: 100%;
	height: 100%;
	position: relative;
}

.catalog-slider-nav-icon--prev {
	right: 20px;
}

.catalog-slider-nav-icon--next {
	left: 20px;
}

@media (max-width: 767px) {
	.catalog-slider-nav {
		display: none !important;
	}
}
</style>
