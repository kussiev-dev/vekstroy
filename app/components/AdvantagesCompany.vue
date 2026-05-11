<script setup lang="ts"></script>

<template>
	<div class="advantages section-offset">
		<div class="container">
			<h2 class="section-title advantages-title">
				Преимущества нашей компании
			</h2>
			<div class="advantages-inner">
				<div class="advantages-cards">
					<div class="advantages-card">
						<div class="advantages-card-content">
							<NuxtImg
								src="images/interface/delivery.svg"
								class="advantages-card-icon"
								alt=""
							/>
							<h4 class="advantages-card-title">
								Быстрая доставка по всей России
							</h4>
						</div>
						<NuxtLink to="/delivery" class="advantages-card-link">Подробнее</NuxtLink>
					</div>
					<div class="advantages-card">
						<div class="advantages-card-content">
							<NuxtImg
								src="images/interface/warehouse.svg"
								class="advantages-card-icon"
								alt=""
							/>
							<h4 class="advantages-card-title">Собственные склады</h4>
						</div>
						<NuxtLink to="/contacts" class="advantages-card-link">Подробнее</NuxtLink>
					</div>
					<div class="advantages-card">
						<div class="advantages-card-content">
							<NuxtImg
								src="images/interface/sertificate.svg"
								class="advantages-card-icon"
								alt=""
							/>
							<h4 class="advantages-card-title">Сертифицированные товары</h4>
						</div>
						<NuxtLink to="/guarantees" class="advantages-card-link">Подробнее</NuxtLink>
					</div>
				</div>
				<div class="advantages-image-wrapper">
					<NuxtImg src="images/Banner.png" class="advantages-image" alt="" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.advantages-title {
	margin-bottom: 40px;
}

.advantages-inner {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 24px;
}

.advantages-cards {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 24px;
	height: 100%;
}

.advantages-card {
	background-color: #6fb47e;
	padding: 24px;
	border-radius: 24px;
	color: #000;
	width: 100%;
	aspect-ratio: 1 / 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	box-sizing: border-box;
	height: 100%;
}

.advantages-card-content {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.advantages-card-icon {
	height: 35px;
	margin-bottom: 16px;
}

.advantages-card-title {
	font-weight: 500;
	font-size: 16px;
}

.advantages-card-link {
	font-weight: 500;
	font-size: 16px;
}

.advantages-image-wrapper {
	height: 100%;
}

.advantages-image {
	height: 100%;
	width: 100%;
	object-fit: cover;
	border-radius: 24px;
}

@media (max-width: 1023px) {
	.advantages-inner {
		grid-template-columns: 1fr;
		gap: 20px;
	}

	.advantages-cards {
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	.advantages-card {
		padding: 20px;
		border-radius: 20px;
	}

	.advantages-card-title {
		font-size: 14px;
	}

	.advantages-image-wrapper {
		min-height: 200px;
	}
}

@media (max-width: 767px) {
	.advantages-inner {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.advantages-title {
		margin-bottom: 24px;
	}

	.advantages-cards {
		grid-template-columns: 1fr;
		gap: 12px;
		order: 1;
	}

	.advantages-card {
		aspect-ratio: auto;
		min-height: auto;
		padding: 20px;
		border-radius: 16px;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 0;
	}

	.advantages-card-content {
		flex: none;
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin-bottom: 16px;
	}

	.advantages-card-icon {
		height: 28px;
		margin-bottom: 0;
		filter: brightness(0);
	}

	.advantages-card-title {
		font-size: 15px;
		font-weight: 600;
	}

	.advantages-card-link {
		font-size: 14px;
		text-decoration: underline;
	}

	.advantages-image-wrapper {
		order: 2;
		height: 213px;
	}

	.advantages-image {
		height: 213px;
		object-fit: cover;
		border-radius: 16px;
	}
}

@media (max-width: 479px) {
	.advantages-card {
		padding: 16px;
	}

	.advantages-card-title {
		font-size: 14px;
	}

	.advantages-card-icon {
		height: 24px;
	}
}
</style>
