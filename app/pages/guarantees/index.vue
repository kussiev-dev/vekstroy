<script setup lang="ts">
definePageMeta({
	title: 'Гарантии и возврат',
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
					<NuxtLink to="/guarantees">Гарантии и возврат</NuxtLink>
				</div>
			</div>

			<div class="info-page-inner section-offset">
				<h1 class="info-page-title section-title">Гарантии и возврат</h1>
				<div class="info-page-content">
					<section class="info-page-section">
						<h2 class="info-page-subtitle">Гарантия на товар</h2>
						<p>
							На всю продукцию распространяется гарантия производителя. Срок гарантии
							указан в сертификатах и технической документации на товар. При обнаружении
							брака или производственного дефекта вы можете обратиться за заменой
							или возвратом средств.
						</p>
					</section>
					<section class="info-page-section">
						<h2 class="info-page-subtitle">Условия возврата</h2>
						<p>
							Вы можете вернуть товар надлежащего качества в течение 14 дней с момента
							покупки, если он не был в употреблении, сохранены товарный вид и упаковка.
							Товар должен соответствовать категории, не входящей в перечень невозвратных
							(согласно законодательству РФ).
						</p>
						<p>
							Для возврата необходимо обратиться в отдел продаж с чеком и заполненным
							заявлением. Товар должен быть доставлен на склад за счёт покупателя.
						</p>
					</section>
					<section class="info-page-section">
						<h2 class="info-page-subtitle">Обмен товара</h2>
						<p>
							Если товар не подошёл по характеристикам или вы обнаружили брак, мы
							осуществим обмен на аналогичный товар или вернём денежные средства
							в течение 10 рабочих дней после приёма товара на складе.
						</p>
					</section>
					<section class="info-page-section">
						<h2 class="info-page-subtitle">Контакты</h2>
						<p>
							По вопросам гарантии и возврата обращайтесь по телефону
							<a href="tel:+79999999999" class="info-page-link">+7 (999) 999-99-99</a>
							или на email
							<a href="mailto:info@vekstroy.ru" class="info-page-link">info@vekstroy.ru</a>.
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

	&-link {
		color: #6fb47e;
		transition: color 0.2s;

		&:hover {
			color: #8bc697;
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
}

@media (max-width: 479px) {
	.info-page-content {
		font-size: 15px;
	}

	.info-page-subtitle {
		font-size: 18px;
	}
}
</style>
