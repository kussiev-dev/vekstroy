<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
	error: NuxtError
}>()

const is404 = computed(() => props.error?.statusCode === 404)
</script>

<template>
	<Header />
	<div class="error-page">
		<div class="container">
			<div class="breadcrumbs">
				<NuxtLink to="/" class="breadcrumbs-back">
					<NuxtImg src="images/interface/arrow-left.svg" class="breadcrumbs-back-icon" />
				</NuxtLink>
				<div class="breadcrumbs-text">
					<NuxtLink to="/">Главная</NuxtLink>
					&gt;
					<span>{{ is404 ? 'Страница не найдена' : 'Ошибка' }}</span>
				</div>
			</div>
			<div class="error-page-inner">
				<div class="error-page-content">
					<h1 class="error-page-code">{{ error?.statusCode || 404 }}</h1>
					<h2 class="error-page-title">
						{{ is404 ? 'Страница не найдена' : 'Что-то пошло не так' }}
					</h2>
					<p class="error-page-text">
						{{
							is404
								? 'Запрашиваемая страница не существует или была перемещена.'
								: 'Произошла ошибка. Попробуйте обновить страницу или вернуться позже.'
						}}
					</p>
					<div class="error-page-actions">
						<NuxtLink to="/" class="error-page-btn error-page-btn--primary">
							На главную
						</NuxtLink>
						<NuxtLink to="/catalog" class="error-page-btn error-page-btn--secondary">
							В каталог
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Footer />
</template>

<style scoped lang="scss">
$green: #6fb47e;

.error-page {
	min-height: 60vh;
	display: flex;
	flex-direction: column;
	color: #fff;
	padding: 80px 0;

	.breadcrumbs {
		margin-bottom: 24px;
	}

	&-inner {
		text-align: center;
		max-width: 560px;
		margin: 0 auto;
	}

	&-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24px;
	}

	&-code {
		font-size: 120px;
		font-weight: 700;
		line-height: 1;
		color: $green;
		margin: 0;
		opacity: 0.9;
	}

	&-title {
		font-size: 32px;
		font-weight: 600;
		margin: 0;
		color: #fff;
	}

	&-text {
		font-size: 18px;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.8);
		margin: 0;
	}

	&-actions {
		display: flex;
		gap: 16px;
		margin-top: 16px;
		flex-wrap: wrap;
		justify-content: center;
	}

	&-btn {
		display: inline-block;
		padding: 12px 24px;
		font-size: 20px;
		font-weight: 700;
		border-radius: 100px;
		text-decoration: none;
		text-align: center;
		transition: opacity 0.2s;

		&:hover {
			opacity: 0.7;
		}

		&--primary {
			background: $green;
			color: #000;
		}

		&--secondary {
			background: transparent;
			color: $green;
			border: 2px solid $green;

			&:hover {
				opacity: 0.7;
			}
		}
	}
}

@media (max-width: 767px) {
	.error-page {
		padding: 48px 0;
	}

	.error-page-code {
		font-size: 80px;
	}

	.error-page-title {
		font-size: 24px;
	}

	.error-page-text {
		font-size: 16px;
	}

	.error-page-btn {
		font-size: 16px;
		padding: 10px 20px;
	}
}

@media (max-width: 479px) {
	.error-page {
		padding: 32px 0;
	}

	.error-page-code {
		font-size: 64px;
	}

	.error-page-title {
		font-size: 20px;
	}

	.error-page-text {
		font-size: 14px;
	}

	.error-page-actions {
		flex-direction: column;
		gap: 12px;
	}

	.error-page-btn {
		width: 100%;
		font-size: 14px;
	}
}
</style>
