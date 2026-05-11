<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const router = useRouter()

const form = ref({
	fio: '',
	address: '',
	phone: '',
	comment: '',
	messenger: ''
})

const messengerOptions = [
	{ value: '', label: 'Мессенджер' },
	{ value: 'WhatsApp', label: 'WhatsApp' },
	{ value: 'Telegram', label: 'Telegram' },
	{ value: 'MAX', label: 'MAX' }
]

// Редирект на корзину, если она пуста
onMounted(() => {
	if (cartStore.items.length === 0) {
		router.replace('/cart')
	}
})

function submitOrder() {
	// TODO: отправка заказа на сервер
	console.log('Order submitted:', form.value, cartStore.items)
}
</script>

<template>
	<Header />
	<div class="checkout">
		<div class="container">
			<div class="breadcrumbs">
				<NuxtLink
					to="/"
					class="breadcrumbs-back"
				>
					<NuxtImg
						src="images/interface/arrow-left.svg"
						class="breadcrumbs-back-icon"
					/>
				</NuxtLink>
				<div class="breadcrumbs-text">
					<NuxtLink to="/">Главная</NuxtLink>
					>
					<NuxtLink to="/cart">Корзина</NuxtLink>
					>
					<NuxtLink to="/checkout">Оформление заказа</NuxtLink>
				</div>
			</div>

			<div class="checkout-inner">
				<h2 class="checkout-title section-title">Оформление заказа</h2>
				<p class="checkout-subtitle">{{ cartStore.totalItems }} товара</p>

				<ClientOnly>
					<div
						v-if="cartStore.items.length === 0"
						class="checkout-empty"
					>
						Корзина пуста.
						<NuxtLink to="/catalog">Перейти в каталог</NuxtLink>
						.
					</div>
					<div
						v-else
						class="checkout-content"
					>
						<div class="checkout-main">
							<form
								id="checkout-form"
								class="checkout-form"
								@submit.prevent="submitOrder"
							>
								<input
									v-model="form.fio"
									type="text"
									placeholder="ФИО"
									class="checkout-input"
									required
								/>
								<input
									v-model="form.address"
									type="text"
									placeholder="Адрес доставки"
									class="checkout-input"
									required
								/>
								<div class="checkout-row">
									<input
										v-model="form.phone"
										type="tel"
										placeholder="Номер телефона"
										class="checkout-input checkout-input--phone"
										required
									/>
									<select
										v-model="form.messenger"
										class="checkout-select"
									>
										<option
											v-for="opt in messengerOptions"
											:key="opt.value"
											:value="opt.value"
										>
											{{ opt.label }}
										</option>
									</select>
								</div>
								<textarea
									v-model="form.comment"
									placeholder="Комментарий к заказу"
									class="checkout-input checkout-textarea"
									rows="4"
								></textarea>
							</form>

							<div class="checkout-order">
								<div class="checkout-order-list">
									<div
										v-for="item in cartStore.items"
										:key="item.product.art"
										class="checkout-order-item"
									>
										<div class="checkout-order-item-row">
											<NuxtLink
												:to="'/products/' + item.product.art"
												class="checkout-order-item-name"
											>
												{{ item.product.name }}
											</NuxtLink>
											<span class="checkout-order-item-price">
												{{ item.product.price * item.quantity }} ₽
											</span>
										</div>
										<span class="checkout-order-item-art">
											Арт. {{ item.product.art }} · {{ item.quantity }} шт.
										</span>
									</div>
								</div>
								<div class="checkout-order-divider"></div>
								<p class="checkout-order-total">
									Итого: {{ cartStore.totalItems }} товара на сумму
									{{ cartStore.totalPrice }} ₽
								</p>
								<button
									type="submit"
									form="checkout-form"
									class="checkout-order-btn"
								>
									Оформить заказ
								</button>
								<p class="checkout-order-disclaimer">
									Подтверждая заказ, Вы соглашаетесь с Правилами продажи и даёте
									согласие на обработку персональных данных в соответствии с
									Политикой.
								</p>
							</div>
						</div>
					</div>
				</ClientOnly>
			</div>
		</div>
	</div>
	<Footer />
</template>

<style scoped lang="scss">
$green: #6fb47e;

.checkout {
	color: #fff;

	&-content {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	&-main {
		display: grid;
		grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
		gap: 24px;
		align-items: stretch;
	}

	&-subtitle {
		font-size: 16px;
		margin-bottom: 24px;
	}

	&-empty {
		padding: 48px 0;
		text-align: center;
		color: rgba(255, 255, 255, 0.7);
		font-size: 16px;

		a {
			color: $green;
		}
	}

	&-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		flex: 1;
		min-height: 0;
	}

	&-input {
		width: 100%;
		padding: 24px;
		font-size: 24px;
		font-weight: 500;
		color: #fff;
		background: transparent;
		border: 2px solid $green;
		border-radius: 16px;
		font-family: inherit;
		transition: 0.2s;
		display: flex;
		align-items: center;

		&::placeholder {
			color: rgba(255, 255, 255, 0.6);
			font-size: 20px;
			font-weight: 500;
		}

		&:focus {
			outline: none;
			box-shadow: 0 0 0 2px rgba(111, 180, 126, 0.3);
		}

		&--phone {
			flex: 1;
			min-width: 0;
		}
	}

	&-textarea {
		resize: vertical;
		flex: 1;
		min-height: 200px;
	}

	&-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		gap: 16px;
		align-items: stretch;
	}

	&-select {
		width: 100%;
		padding: 24px;
		font-size: 24px;
		font-weight: 500;
		color: #fff;
		background: transparent;
		border: 2px solid $green;
		border-radius: 16px;
		font-family: inherit;
		transition: 0.2s;
		cursor: pointer;
		appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236fb47e' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 20px center;
		background-size: 24px;
		padding-right: 56px;

		option {
			background: #0d160f;
			color: #fff;
		}

		&:focus {
			outline: none;
			box-shadow: 0 0 0 2px rgba(111, 180, 126, 0.3);
		}
	}

	&-order {
		padding: 40px;
		border-radius: 24px;
		border: 2px solid $green;
		height: fit-content;
		position: sticky;
		top: 24px;
		align-self: start;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	&-order-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	&-order-item {
		display: flex;
		flex-direction: column;
		gap: 4px;

		&-row {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			gap: 16px;
		}

		&-name {
			font-size: 16px;
			font-weight: 500;
			color: #fff;
			text-decoration: none;
			flex: 1;
			min-width: 0;

			&:hover {
				color: $green;
			}
		}

		&-art {
			font-size: 12px;
			color: rgba(255, 255, 255, 0.8);
		}

		&-price {
			font-size: 20px;
			font-weight: 700;
			color: #fff;
			flex-shrink: 0;
		}
	}

	&-order-divider {
		height: 2px;
		background: $green;
		width: 100%;
	}

	&-order-total {
		font-size: 16px;
		font-weight: 600;
		color: #fff;
	}

	&-order-btn {
		display: block;
		width: 100%;
		padding: 12px 24px;
		background: $green;
		color: #000;
		font-weight: 700;
		font-size: 20px;
		text-align: center;
		border-radius: 100px;
		border: none;
		cursor: pointer;
		font-family: inherit;
		transition: opacity 0.2s;

		&:hover {
			opacity: 0.7;
		}
	}

	&-order-disclaimer {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.6);
		line-height: 1.4;
	}
}

@media (max-width: 1023px) {
	.checkout-main {
		grid-template-columns: 1fr;
		gap: 24px;
	}

	.checkout-order {
		position: static;
		padding: 32px;
	}
}

@media (max-width: 767px) {
	.checkout-input,
	.checkout-select {
		padding: 16px;
		font-size: 18px;

		&::placeholder {
			font-size: 16px;
		}
	}

	.checkout-row {
		grid-template-columns: 1fr;
	}

	.checkout-order {
		padding: 24px;
		border-radius: 20px;
	}

	.checkout-order-item-name {
		font-size: 14px;
	}

	.checkout-order-btn {
		font-size: 18px;
		padding: 10px 20px;
	}
}

@media (max-width: 479px) {
	.checkout-input,
	.checkout-select {
		padding: 12px;
		font-size: 16px;

		&::placeholder {
			font-size: 14px;
		}
	}

	.checkout-order {
		padding: 20px;
		border-radius: 16px;
		gap: 16px;
	}

	.checkout-order-btn {
		font-size: 16px;
	}
}
</style>
