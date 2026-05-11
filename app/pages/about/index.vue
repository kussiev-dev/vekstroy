<script setup lang="ts">
definePageMeta({
	title: 'О компании',
})
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
					<NuxtLink to="/about">О компании</NuxtLink>
				</div>
			</div>

			<div class="info-page-inner section-offset">
				<h1 class="info-page-title section-title">О компании</h1>
				<div class="info-page-content">
					<p class="info-page-lead">
						ООО «Векстрой» — современная компания по продаже строительных материалов
						и товаров для ремонта. Мы работаем на рынке длительное время и заслужили
						доверие тысяч клиентов.
					</p>
					<section class="info-page-section">
						<h2 class="info-page-subtitle">Наша миссия</h2>
						<p>
							Предоставлять качественные строительные материалы по доступным ценам,
							помогая нашим клиентам реализовывать проекты любой сложности — от
							ремонта квартиры до возведения загородного дома.
						</p>
					</section>
					<section class="info-page-section">
						<h2 class="info-page-subtitle">Почему выбирают нас</h2>
						<ul class="info-page-list">
							<li>Широкий ассортимент кирпича, керамогранита, дверей и других товаров</li>
							<li>Собственные склады с товаром в наличии</li>
							<li>Удобная доставка по региону</li>
							<li>Гарантия качества на всю продукцию</li>
							<li>Профессиональные консультации специалистов</li>
						</ul>
					</section>
					<section class="info-page-section">
						<h2 class="info-page-subtitle">Наша команда</h2>
						<p>
							В «Векстрой» работают опытные менеджеры и логисты, которые всегда
							помогут подобрать нужные материалы и организовать доставку.
						</p>
					</section>
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

	&-content {
		max-width: 780px;
		font-size: 18px;
		line-height: 1.6;
	}

	&-lead {
		font-size: 20px;
		line-height: 1.5;
		margin-bottom: 32px;
		color: rgba(255, 255, 255, 0.95);
	}

	&-section {
		margin-bottom: 32px;

		&:last-child {
			margin-bottom: 0;
		}

		p {
			margin: 0 0 16px;
			color: rgba(255, 255, 255, 0.9);

			&:last-child {
				margin-bottom: 0;
			}
		}
	}

	&-subtitle {
		font-size: 24px;
		font-weight: 600;
		color: #6fb47e;
		margin: 0 0 16px;
	}

	&-list {
		margin: 0;
		padding-left: 24px;
		color: rgba(255, 255, 255, 0.9);

		li {
			margin-bottom: 8px;

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}

@media (max-width: 767px) {
	.info-page-title {
		margin-bottom: 24px;
	}

	.info-page-content {
		font-size: 16px;
	}

	.info-page-lead {
		font-size: 18px;
		margin-bottom: 24px;
	}

	.info-page-subtitle {
		font-size: 20px;
		margin-bottom: 12px;
	}

	.info-page-section {
		margin-bottom: 24px;
	}
}

@media (max-width: 479px) {
	.info-page-content {
		font-size: 15px;
	}

	.info-page-lead {
		font-size: 16px;
	}

	.info-page-subtitle {
		font-size: 18px;
	}

	.info-page-list {
		padding-left: 20px;
	}
}
</style>
