<script setup lang="ts">
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/carousel.css'

const { data: items } = await useFetch(
	'https://c5ad6c66e5034f6b.mokky.dev/items'
)

const carouselConfig = {
	itemsToShow: 4,
	wrapAround: true,
	autoplay: 5000,
	gap: 24,
	itemsToScroll: 1,
	snapAlign: 'start',
	transition: 500,
	breakpoints: {
		320: { itemsToShow: 1, gap: 12 },
		480: { itemsToShow: 2, gap: 16 },
		768: { itemsToShow: 3, gap: 20 },
		1024: { itemsToShow: 4, gap: 24 }
	}
}
</script>

<template>
	<div class="news section-offset">
		<div class="container">
			<h2 class="news-title section-title">Новинки</h2>
			<div class="news-inner">
				<div class="news-grid">
					<ProductCard
						v-for="(slide, index) in (items || []).slice(0, 4)"
						:key="slide?.art ?? index"
						:images="slide.images"
						:art="slide.art"
						:name="slide.name"
						:price="slide.price"
					/>
				</div>
				<div class="news-carousel">
					<Carousel v-bind="carouselConfig">
						<Slide
							v-for="(slide, index) in items"
							:key="index"
						>
							<ProductCard
								:images="slide.images"
								:art="slide.art"
								:name="slide.name"
								:price="slide.price"
							/>
						</Slide>

						<template #addons>
							<Navigation class="news-nav">
								<template #prev>
									<NuxtImg
										src="images/interface/arrow-left.svg"
										class="news-nav-icon news-nav-icon--prev"
									/>
								</template>
								<template #next>
									<NuxtImg
										src="images/interface/arrow-right.svg"
										class="news-nav-icon news-nav-icon--next"
									/>
								</template>
							</Navigation>
						</template>
					</Carousel>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.news-title {
	margin-bottom: 40px;
}

.news-inner {
	width: 100%;
}

.news-grid {
	display: none;
}

.news-carousel {
	display: block;
}

.news-nav {
	width: 40px;
	height: 40px;
}

.news-nav-icon {
	width: 100%;
	height: 100%;
	position: relative;
}

.news-nav-icon--prev {
	right: 20px;
}

.news-nav-icon--next {
	left: 20px;
}

@media (max-width: 767px) {
	.news-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 16px;
	}

	.news-carousel {
		display: none;
	}
}
</style>
