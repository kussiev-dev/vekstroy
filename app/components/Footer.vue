<script setup lang="ts"></script>

<template>
	<footer class="footer section-offset">
		<div class="container">
			<div class="footer-inner">
				<div class="footer-left">
					<div class="footer-top">
						<div class="footer-columns">
							<div class="footer-column">
								<h4 class="footer-title">О компании</h4>
								<ul class="footer-list">
									<li>
										<NuxtLink to="/about">О компании</NuxtLink>
									</li>
									<li>
										<NuxtLink to="/about">Миссия и партнеры</NuxtLink>
									</li>
									<li>
										<NuxtLink to="/about">Сертификаты и лицензии</NuxtLink>
									</li>
									<li>
										<NuxtLink to="/guarantees">Гарантии и возврат</NuxtLink>
									</li>
									<li>
										<NuxtLink to="/news">Новости и акции</NuxtLink>
									</li>
								</ul>
							</div>
							<div class="footer-column">
								<h4 class="footer-title">Каталог</h4>
								<ul class="footer-list">
									<li>
										<NuxtLink to="/catalog">Строительные смеси</NuxtLink>
									</li>
									<li>
										<NuxtLink to="/catalog">Кирпич и блоки</NuxtLink>
									</li>
									<li>
										<NuxtLink to="/catalog">Металлопрокат</NuxtLink>
									</li>
									<li>
										<NuxtLink to="/catalog">Электроинструменты</NuxtLink>
									</li>
									<li>
										<NuxtLink to="/catalog">Пиломатериалы</NuxtLink>
									</li>
									<li>
										<NuxtLink to="/catalog">Крепеж и фурнитура</NuxtLink>
									</li>
									<li>
										<NuxtLink to="/catalog">Все категории</NuxtLink>
									</li>
								</ul>
							</div>
							<div class="footer-column footer-column--support">
								<div class="footer-support">
									<h4 class="footer-title">Поддержка</h4>
									<ul class="footer-list">
										<li>
											<NuxtLink to="/contacts">Контактная информация</NuxtLink>
										</li>
										<li>
											<NuxtLink to="/contacts">Адреса складов</NuxtLink>
										</li>
										<li>
											<NuxtLink to="/contacts">Карта</NuxtLink>
										</li>
										<li>
											<NuxtLink to="/contacts">Обратная связь</NuxtLink>
										</li>
									</ul>
								</div>
								<div>
									<NuxtLink to="/contacts" class="footer-title">Работа у нас</NuxtLink>
								</div>
							</div>
						</div>
						<div class="footer-socials">
							<h4 class="footer-title">Наши соцсети</h4>
							<ul class="footer-socials-list">
								<li>
									<NuxtLink to="/contacts">
										<NuxtImg src="images/socials/telegram.svg" class="footer-socials-icon" />
									</NuxtLink>
								</li>
								<li>
									<NuxtLink to="/contacts">
										<NuxtImg src="images/socials/phone.svg" class="footer-socials-icon" />
									</NuxtLink>
								</li>
								<li>
									<NuxtLink to="/contacts">
										<NuxtImg src="images/socials/mail.svg" class="footer-socials-icon" />
									</NuxtLink>
								</li>
							</ul>
						</div>
					</div>
					<div class="footer-legal">
						<p class="footer-legal-text">
							Вы принимаете условия политики в отношении обработки персональных
							данных  и пользовательского соглашения каждый раз, когда оставляете свои данные в
							любой форме обратной связи на сайте
						</p>
					</div>
				</div>
				<div class="footer-right">
					<div style="width: 100%; height: 100%; overflow: hidden; position: relative">
						<iframe
							style="
								width: 100%;
								height: 100%;
								border: 1px solid #e6e6e6;
								border-radius: 8px;
								box-sizing: border-box;
							"
							src="https://yandex.ru/maps-reviews-widget/243053812828?comments"
						></iframe>
						<a
							href="https://yandex.ru/maps/org/vekstroy/243053812828/"
							target="_blank"
							style="
								box-sizing: border-box;
								text-decoration: none;
								color: #b3b3b3;
								font-size: 10px;
								font-family:
									YS Text,
									sans-serif;
								padding: 0 20px;
								position: absolute;
								bottom: 8px;
								width: 100%;
								text-align: center;
								left: 0;
								overflow: hidden;
								text-overflow: ellipsis;
								display: block;
								max-height: 14px;
								white-space: nowrap;
								padding: 0 16px;
								box-sizing: border-box;
							"
						>
							Vekstroy на карте Республики Северная Осетия — Алания — Яндекс Карты
						</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<style scoped lang="scss">
.footer-inner {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 24px;
}

.footer-top {
	display: flex;
	flex-direction: column;
	gap: 40px;
	margin-bottom: 150px;
}

.footer-columns {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 24px;
}

.footer-column {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.footer-column--support {
	gap: 24px;
}

.footer-support {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.footer-title {
	font-weight: 600;
	font-size: 20px;
}

.footer-list {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	gap: 8px;
	font-size: 14px;
}

.footer-socials {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

.footer-socials-list {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	gap: 16px;
}

.footer-socials-icon {
	height: 20px;
	width: auto;
	display: block;
}

.footer-legal {
	width: 100%;
}

.footer-legal-text {
	font-weight: 300;
	font-size: 12px;
}

.footer-right {
	height: 100%;
	min-height: 300px;
}

@media (max-width: 1023px) {
	.footer-inner {
		grid-template-columns: 1fr;
		gap: 32px;
	}

	.footer-top {
		margin-bottom: 48px;
	}

	.footer-right {
		min-height: 250px;
	}
}

@media (max-width: 767px) {
	.footer {
		padding-bottom: 80px;
	}

	.footer-columns {
		grid-template-columns: 1fr;
		gap: 32px;
	}

	.footer-top {
		margin-bottom: 32px;
		gap: 32px;
	}

	.footer-title {
		font-size: 18px;
	}

	.footer-list {
		font-size: 14px;
	}

	.footer-right {
		min-height: 200px;
	}
}

@media (max-width: 479px) {
	.footer-top {
		margin-bottom: 24px;
		gap: 24px;
	}

	.footer-legal-text {
		font-size: 11px;
	}

	.footer-right {
		min-height: 180px;
	}
}
</style>
