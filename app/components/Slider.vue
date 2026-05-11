<script setup lang="ts">
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/carousel.css'

const carouselConfig = {
	itemsToShow: 1,
	wrapAround: true,
	autoplay: 5000,
	transition: 500
}

const items = [
	'/images/Banner.png',
	'/images/Banner.png',
	'/images/Banner.png',
	'/images/Banner.png',
	'/images/Banner.png',
	'/images/Banner.png'
]
</script>

<template>
	<div class="slider">
		<div class="container">
			<div class="slider-inner section-offset">
				<Carousel
					v-bind="carouselConfig"
					class="slider-carousel"
				>
					<Slide
						v-for="slide in items"
						:key="slide"
						class="slider-slide"
					>
						<NuxtImg
							:src="slide"
							class="slider-image"
						/>
					</Slide>

					<template #addons>
						<Navigation class="slider-nav">
							<template #prev>
								<NuxtImg
									src="images/interface/arrow-left.svg"
									class="slider-nav-icon slider-nav-icon--prev"
								/>
							</template>
							<template #next>
								<NuxtImg
									src="images/interface/arrow-right.svg"
									class="slider-nav-icon slider-nav-icon--next"
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
.slider-carousel {
	width: 100%;
}

.slider-slide {
	width: 100%;
}

.slider-image {
	width: 100%;
	height: auto;
	display: block;
}

.slider-nav {
	width: 40px;
	height: 40px;
}

.slider-nav-icon {
	width: 100%;
	height: 100%;
	position: relative;
}

.slider-nav-icon--prev {
	right: 20px;
}

.slider-nav-icon--next {
	left: 20px;
}

@media (max-width: 767px) {
	.slider-nav {
		display: none !important;
	}
}
</style>
