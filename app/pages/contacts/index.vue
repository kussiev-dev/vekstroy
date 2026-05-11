<script setup lang="ts">
definePageMeta({
	title: 'Контакты',
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
					<NuxtLink to="/contacts">Контакты</NuxtLink>
				</div>
			</div>

			<div class="info-page-inner section-offset">
				<h1 class="info-page-title section-title">Контакты</h1>
				<div class="info-page-content">
					<section class="info-page-section">
						<h2 class="info-page-subtitle">Связаться с нами</h2>
						<ul class="info-page-contacts">
							<li class="info-page-contact">
								<span class="info-page-contact-label">Телефон:</span>
								<a href="tel:+79999999999" class="info-page-contact-link">+7 (999) 999-99-99</a>
							</li>
							<li class="info-page-contact">
								<span class="info-page-contact-label">Email:</span>
								<a href="mailto:info@vekstroy.ru" class="info-page-contact-link">info@vekstroy.ru</a>
							</li>
							<li class="info-page-contact">
								<span class="info-page-contact-label">Режим работы:</span>
								<span>Пн–Пт: 9:00–18:00, Сб: 10:00–16:00</span>
							</li>
						</ul>
					</section>
					<section class="info-page-section">
						<h2 class="info-page-subtitle">Адреса складов</h2>
						<ul class="info-page-list">
							<li><strong>Назрань-1</strong> — г. Назрань, ул. Складская, 1</li>
							<li><strong>Назрань-2</strong> — г. Назрань, пр. Строителей, 15</li>
							<li><strong>Карабулак</strong> — г. Карабулак, ул. Промышленная, 5</li>
							<li><strong>Магас</strong> — г. Магас, ул. Ингушская, 10</li>
						</ul>
						<p>
							Перед визитом рекомендуем уточнить наличие товара по телефону.
							Самовывоз со склада возможен по предварительной заявке.
						</p>
					</section>
					<section class="info-page-section">
						<h2 class="info-page-subtitle">Реквизиты</h2>
						<p>
							ООО «Векстрой»<br>
							ИНН: 0000000000<br>
							ОГРН: 0000000000000<br>
							Юридический адрес: Республика Ингушетия, г. Назрань
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

	&-contacts {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	&-contact {
		margin-bottom: 12px;
		color: rgba(255, 255, 255, 0.9);

		&:last-child {
			margin-bottom: 0;
		}
	}

	&-contact-label {
		display: inline-block;
		min-width: 140px;
		color: rgba(255, 255, 255, 0.7);
	}

	&-contact-link {
		color: #6fb47e;
		transition: color 0.2s;

		&:hover {
			color: #8bc697;
		}
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

	.info-page-contact-label {
		min-width: 120px;
	}
}

@media (max-width: 479px) {
	.info-page-content {
		font-size: 15px;
	}

	.info-page-subtitle {
		font-size: 18px;
	}

	.info-page-contact-label {
		min-width: 100px;
		display: block;
		margin-bottom: 4px;
	}
}
</style>
