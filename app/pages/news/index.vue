<script setup lang="ts">
definePageMeta({
	title: 'Новости и акции',
})

const news = [
	{
		date: '5 февраля 2025',
		title: 'Новая коллекция керамогранита',
		text: 'В каталог добавлена новая коллекция керамогранита под мрамор и дерево. Скидка 15% на первый заказ.',
	},
	{
		date: '28 января 2025',
		title: 'Расширение ассортимента кирпича',
		text: 'Поступили новые позиции клинкерного и облицовочного кирпича от проверенных производителей.',
	},
	{
		date: '15 января 2025',
		title: 'Акция на выходные двери',
		text: 'До конца января действует скидка 10% на металлические входные двери с терморазрывом.',
	},
	{
		date: '10 января 2025',
		title: 'Обновление складской программы',
		text: 'Склад в Магасе пополнился новыми позициями. Доставка в Магас и прилегающие районы — от 1 дня.',
	},
]
</script>

<template>
	<Header />
	<div class="info-page">
		<div class="container">
			<div class="breadcrumbs">
				<NuxtLink to="/" class="breadcrumbs-back">
					<NuxtImg src="images/interface/arrow-left.svg" class="breadcrumbs-back-icon" />
				</NuxtLink>
				<div class="breadcrumbs-text">
					<NuxtLink to="/">Главная</NuxtLink>
					&gt;
					<NuxtLink to="/news">Новости и акции</NuxtLink>
				</div>
			</div>

			<div class="info-page-inner section-offset">
				<h1 class="info-page-title section-title">Новости и акции</h1>
				<div class="info-page-news">
					<article
						v-for="(item, index) in news"
						:key="index"
						class="info-page-news-item"
					>
						<time class="info-page-news-date">{{ item.date }}</time>
						<h2 class="info-page-news-title">{{ item.title }}</h2>
						<p class="info-page-news-text">{{ item.text }}</p>
					</article>
				</div>
			</div>
		</div>
	</div>
	<Footer />
</template>

<style scoped lang="scss">
.info-page {
	color: #fff;

	.breadcrumbs {
		margin-bottom: 24px;
	}

	&-inner {
		padding-top: 0;
	}

	&-title {
		margin-bottom: 40px;
	}

	&-news {
		display: flex;
		flex-direction: column;
		gap: 32px;
		max-width: 780px;
	}

	&-news-item {
		padding: 24px;
		border: 2px solid #6fb47e;
		border-radius: 16px;
		background: rgba(111, 180, 126, 0.05);
	}

	&-news-date {
		display: block;
		font-size: 14px;
		color: rgba(255, 255, 255, 0.6);
		margin-bottom: 8px;
	}

	&-news-title {
		font-size: 22px;
		font-weight: 600;
		color: #6fb47e;
		margin: 0 0 12px;
	}

	&-news-text {
		font-size: 16px;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.9);
		margin: 0;
	}
}

@media (max-width: 767px) {
	.info-page-title {
		margin-bottom: 24px;
	}

	.info-page-news {
		gap: 20px;
	}

	.info-page-news-item {
		padding: 20px;
		border-radius: 14px;
	}

	.info-page-news-title {
		font-size: 18px;
	}

	.info-page-news-text {
		font-size: 15px;
	}
}

@media (max-width: 479px) {
	.info-page-news-item {
		padding: 16px;
		border-radius: 12px;
	}

	.info-page-news-title {
		font-size: 16px;
	}

	.info-page-news-text {
		font-size: 14px;
	}
}
</style>
