<script setup lang="ts">
definePageMeta({
	title: 'Доставка и оплата',
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
					<NuxtLink to="/delivery">Доставка и оплата</NuxtLink>
				</div>
			</div>

			<div class="info-page-inner section-offset">
				<h1 class="info-page-title section-title">Доставка и оплата</h1>
				<div class="info-page-content">
					<section class="info-page-section">
						<h2 class="info-page-subtitle">Доставка</h2>
						<p>
							Мы осуществляем доставку строительных материалов по региону. Стоимость
							и сроки рассчитываются индивидуально в зависимости от объёма заказа
							и адреса доставки.
						</p>
						<ul class="info-page-list">
							<li><strong>Самовывоз</strong> — бесплатно со склада при заказе от 5000 ₽</li>
							<li><strong>Доставка по городу</strong> — от 500 ₽</li>
							<li><strong>Доставка по области</strong> — по тарифам перевозчика</li>
							<li><strong>Срок доставки</strong> — 1–3 рабочих дня после подтверждения заказа</li>
						</ul>
					</section>
					<section class="info-page-section">
						<h2 class="info-page-subtitle">Способы оплаты</h2>
						<ul class="info-page-list">
							<li>Наличный расчёт при получении</li>
							<li>Банковская карта (при получении или онлайн)</li>
							<li>Безналичный расчёт для юридических лиц</li>
						</ul>
						<p>
							Оплата банковской картой и наличными возможна при получении товара
							в пункте выдачи или при доставке курьером.
						</p>
					</section>
					<section class="info-page-section">
						<h2 class="info-page-subtitle">Условия доставки</h2>
						<p>
							Груз доставляется до подъезда. Подъём на этаж и разгрузка оплачиваются
							отдельно. Рекомендуем заранее уточнить наличие лифта и свободного
							подъезда для крупногабаритных товаров.
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
		margin: 0 0 16px;
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

	.info-page-subtitle {
		font-size: 18px;
	}

	.info-page-list {
		padding-left: 20px;
	}
}
</style>
