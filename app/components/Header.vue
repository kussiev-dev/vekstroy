<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useSavedStore } from '~/stores/saved'

const cartStore = useCartStore()
const savedStore = useSavedStore()
const router = useRouter()

const searchQuery = ref('')
const showDropdown = ref(false)
const searchRef = ref<HTMLElement | null>(null)
const isMobile = ref(false)

onMounted(() => {
	const mql = window.matchMedia('(max-width: 767px)')
	isMobile.value = mql.matches
	mql.addEventListener('change', e => {
		isMobile.value = e.matches
	})
})

const { data: allItems } = await useFetch<any[]>(
	'https://c5ad6c66e5034f6b.mokky.dev/items'
)
const { data: allCatalogs } = await useFetch<any[]>(
	'https://c5ad6c66e5034f6b.mokky.dev/catalogs'
)

const searchResults = computed(() => {
	const q = searchQuery.value.trim().toLowerCase()
	if (!q || q.length < 2) return { catalogs: [], products: [] }

	const catalogs = (allCatalogs.value || []).filter(
		(c: any) =>
			(c.name || '').toLowerCase().includes(q) ||
			(c.nameForLink || '').toLowerCase().includes(q)
	)
	const products = (allItems.value || []).filter(
		(p: any) =>
			(p.name || '').toLowerCase().includes(q) ||
			String(p.art || '').includes(q)
	)

	return {
		catalogs: catalogs.slice(0, 5),
		products: products.slice(0, 8)
	}
})

const hasResults = computed(
	() =>
		searchResults.value.catalogs.length > 0 ||
		searchResults.value.products.length > 0
)

function openDropdown() {
	showDropdown.value = true
}

function closeDropdown() {
	showDropdown.value = false
}

function goToProduct(art: number) {
	closeDropdown()
	searchQuery.value = ''
	router.push('/products/' + art)
}

function goToCatalog(nameForLink: string) {
	closeDropdown()
	searchQuery.value = ''
	router.push('/catalog/' + nameForLink)
}

function submitSearch() {
	if (searchQuery.value.trim().length < 2) return
	if (hasResults.value && searchResults.value.products.length > 0) {
		goToProduct(searchResults.value.products[0].art)
	} else if (hasResults.value && searchResults.value.catalogs.length > 0) {
		goToCatalog(searchResults.value.catalogs[0].nameForLink)
	} else {
		router.push('/search?q=' + encodeURIComponent(searchQuery.value.trim()))
		closeDropdown()
		searchQuery.value = ''
	}
}

function handleClickOutside(e: MouseEvent) {
	if (searchRef.value && !searchRef.value.contains(e.target as Node)) {
		closeDropdown()
	}
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => {
	document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
	<header class="header">
		<div class="container">
			<div class="header-inner">
				<!-- Десктоп: верхняя строка -->
				<div class="header-top">
					<span class="header-company">ООО "Векстрой"</span>
					<nav class="nav">
						<ul class="nav-list">
							<li class="nav-item">
								<NuxtLink
									to="/catalog"
									class="nav-link"
								>
									Каталог
								</NuxtLink>
							</li>
							<li class="nav-item">
								<NuxtLink
									to="/about"
									class="nav-link"
								>
									О компании
								</NuxtLink>
							</li>
							<li class="nav-item">
								<NuxtLink
									to="/delivery"
									class="nav-link"
								>
									Доставка и оплата
								</NuxtLink>
							</li>
							<li class="nav-item">
								<NuxtLink
									to="/contacts"
									class="nav-link"
								>
									Контакты
								</NuxtLink>
							</li>
							<li class="nav-item">
								<NuxtLink
									to="/news"
									class="nav-link"
								>
									Новости/Акции
								</NuxtLink>
							</li>
						</ul>
					</nav>
					<NuxtLink
						to="/contacts"
						class="header-phone"
					>
						+7 (999) 999-99-99
					</NuxtLink>
				</div>

				<!-- Мобильный: верхняя строка (лого | телефон) -->
				<div class="header-mobile-top">
					<NuxtLink
						to="/"
						class="header-mobile-brand"
					>
						<NuxtImg
							src="images/logo.svg"
							class="header-mobile-logo"
							alt="VEKSTROY"
						/>
					</NuxtLink>
					<NuxtLink
						to="/contacts"
						class="header-mobile-phone"
					>
						+7 (999) 999-99-99
					</NuxtLink>
				</div>

				<!-- Нижняя строка: лого + поиск + иконки (десктоп) / только поиск (мобильный) -->
				<div class="header-bottom">
					<div class="header-logo">
						<NuxtLink
							to="/"
							class="header-logo-link"
						>
							<NuxtImg
								src="images/logo.svg"
								class="header-logo-img"
							/>
						</NuxtLink>
					</div>
					<div
						ref="searchRef"
						class="header-search"
					>
						<input
							v-model="searchQuery"
							type="text"
							:placeholder="isMobile ? 'Поиск' : 'Поиск'"
							class="header-search-input"
							autocomplete="off"
							@focus="openDropdown"
							@input="openDropdown"
							@keydown.enter.prevent="submitSearch"
						/>
						<NuxtImg
							src="images/interface/search-icon.svg"
							class="header-search-icon"
						/>
						<Transition name="header-search-dropdown">
							<div
								v-if="showDropdown && searchQuery.trim().length >= 2"
								class="header-search-dropdown"
							>
								<div
									v-if="!hasResults"
									class="header-search-empty"
								>
									Ничего не найдено
								</div>
								<template v-else>
									<div
										v-if="searchResults.catalogs.length > 0"
										class="header-search-section"
									>
										<div class="header-search-section-title">Категории</div>
										<button
											v-for="cat in searchResults.catalogs"
											:key="cat.id"
											type="button"
											class="header-search-item"
											@click="goToCatalog(cat.nameForLink)"
										>
											{{ cat.name }}
										</button>
									</div>
									<div
										v-if="searchResults.products.length > 0"
										class="header-search-section"
									>
										<div class="header-search-section-title">Товары</div>
										<button
											v-for="product in searchResults.products"
											:key="product.art"
											type="button"
											class="header-search-item header-search-item--product"
											@click="goToProduct(product.art)"
										>
											<img
												v-if="product.images?.[0]"
												:src="product.images[0]"
												class="header-search-item-img"
												alt=""
											/>
											<div class="header-search-item-info">
												<span class="header-search-item-name">
													{{ product.name }}
												</span>
												<span class="header-search-item-price">
													{{ product.price }} ₽
												</span>
											</div>
										</button>
									</div>
								</template>
							</div>
						</Transition>
					</div>
					<div class="header-icons">
						<NuxtLink
							to="/saved"
							class="header-button"
						>
							<NuxtImg
								src="images/saved.svg"
								alt="saved"
								class="header-button-img"
							/>
							<span
								v-if="savedStore.items.length > 0"
								class="header-badge"
							>
								{{ savedStore.items.length }}
							</span>
						</NuxtLink>
						<NuxtLink
							to="/cart"
							class="header-button"
						>
							<NuxtImg
								src="images/cart.svg"
								alt="cart"
								class="header-button-img"
							/>
							<span
								v-if="cartStore.totalItems > 0"
								class="header-badge"
							>
								{{ cartStore.totalItems }}
							</span>
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<style scoped lang="scss">
.header {
	position: sticky;
	top: 0;
	z-index: 100;
	padding: 24px 0 16px;
	background-color: #0d160f;
}

.header-inner {
	display: flex;
	flex-direction: column;
	gap: 24px;
}

.header-top {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
}

.header-company,
.header-phone {
	font-weight: 600;
}

.nav-list {
	display: flex;
	justify-content: space-between;
	gap: 24px;
	list-style: none;
	margin: 0;
	padding: 0;
}

.nav-link {
	font-size: 14px;
	transition: color 0.2s;

	&:hover {
		color: #6fb47e;
	}
}

.header-phone {
	transition: color 0.2s;

	&:hover {
		color: #6fb47e;
	}
}

// Мобильная верхняя строка — скрыта на десктопе
.header-mobile-top {
	display: none;
}

.header-bottom {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 32px;
}

.header-logo {
	flex: 0 0 217px;
}

.header-logo-link {
	display: block;
}

.header-logo-img {
	display: block;
	width: 100%;
	height: auto;
}

.header-search {
	position: relative;
	flex: 1 1 auto;
}

.header-search-input {
	width: 100%;
	border-radius: 999px;
	padding: 8px 56px 8px 56px;
	font-size: 20px;
	color: #0d160f;
	background-color: #6fb47e;
	border: none;
}

.header-search-input::placeholder {
	color: #0d160f;
}

.header-search-icon {
	position: absolute;
	left: 24px;
	top: 50%;
	transform: translateY(-50%);
	width: 24px;
	height: 24px;
}

.header-search-dropdown {
	position: absolute;
	top: calc(100% + 8px);
	left: 0;
	right: 0;
	max-height: 400px;
	overflow-y: auto;
	background: #0d160f;
	border: 2px solid #6fb47e;
	border-radius: 16px;
	box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
	z-index: 200;
	padding: 12px 0;
}

.header-search-dropdown-enter-active,
.header-search-dropdown-leave-active {
	transition: opacity 0.15s ease;
}

.header-search-dropdown-enter-from,
.header-search-dropdown-leave-to {
	opacity: 0;
}

.header-search-empty {
	padding: 24px 20px;
	color: rgba(255, 255, 255, 0.7);
	font-size: 16px;
	text-align: center;
}

.header-search-section {
	padding: 0 12px 12px;

	&:last-child {
		padding-bottom: 0;
	}
}

.header-search-section-title {
	font-size: 12px;
	font-weight: 600;
	color: rgba(255, 255, 255, 0.6);
	text-transform: uppercase;
	letter-spacing: 0.5px;
	margin-bottom: 8px;
	padding: 0 8px;
}

.header-search-item {
	display: flex;
	align-items: center;
	gap: 12px;
	width: 100%;
	padding: 12px 16px;
	border: none;
	background: transparent;
	color: #fff;
	font-size: 16px;
	text-align: left;
	cursor: pointer;
	border-radius: 12px;
	font-family: inherit;
	transition: background 0.2s;

	&:hover {
		background: rgba(111, 180, 126, 0.15);
	}

	&--product {
		display: flex;
		align-items: center;
	}

	&-img {
		width: 48px;
		height: 48px;
		border-radius: 8px;
		object-fit: cover;
		flex-shrink: 0;
	}

	&-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
		min-width: 0;
		flex: 1;
	}

	&-name {
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	&-price {
		font-size: 14px;
		font-weight: 700;
		color: #6fb47e;
	}
}

.header-icons {
	display: flex;
	align-items: center;
	gap: 24px;
}

.header-button {
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	transition: opacity 0.2s;

	&:hover {
		opacity: 0.7;
	}
}

.header-badge {
	position: absolute;
	top: -4px;
	right: -4px;
	min-width: 18px;
	height: 18px;
	padding: 0 5px;
	background: #6fb47e;
	color: #000;
	font-size: 12px;
	font-weight: 700;
	line-height: 18px;
	text-align: center;
	border-radius: 100px;
}

.header-button-img {
	display: block;
	height: 40px;
	width: 40px;
}

@media (max-width: 1023px) {
	.header {
		padding: 16px 0 12px;
	}

	.header-inner {
		gap: 16px;
	}

	.header-top {
		.header-company {
			display: none;
		}
	}

	.header-logo {
		flex: 0 0 160px;
	}

	.header-search-input {
		font-size: 16px;
		padding: 6px 48px 6px 48px;
	}

	.header-search-icon {
		left: 16px;
		width: 20px;
		height: 20px;
	}

	.header-button-img {
		height: 32px;
		width: 32px;
	}

	.header-icons {
		gap: 16px;
	}
}

@media (max-width: 767px) {
	.header {
		padding: 16px 0 16px;
	}

	// Скрыть десктопную верхнюю строку
	.header-top {
		display: none;
	}

	// Показать мобильную верхнюю строку: лого + бренд | телефон
	.header-mobile-top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 16px;
	}

	.header-mobile-brand {
		display: flex;
		align-items: center;
		text-decoration: none;
	}

	.header-mobile-logo {
		width: auto;
		height: 46px;
		display: block;
	}

	.header-mobile-phone {
		font-size: 16px;
		font-weight: 700;
		color: #fff;
		text-decoration: none;
		white-space: nowrap;
		transition: color 0.2s;

		&:hover {
			color: #6fb47e;
		}
	}

	// Нижняя строка: только поиск на всю ширину
	.header-bottom {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.header-logo {
		display: none;
	}

	.header-icons {
		display: none;
	}

	.header-search {
		width: 100%;
	}

	.header-search-input {
		font-size: 16px;
		padding: 12px 48px 12px 48px;
	}

	.header-search-icon {
		left: 20px;
		right: auto;
		width: 20px;
		height: 20px;
	}
}

@media (max-width: 479px) {
	:root {
		--header-height: 140px;
	}

	.header-mobile-logo {
		height: 46px;
	}

	.header-mobile-phone {
		font-size: 14px;
	}
}

@media (min-width: 768px) {
	:root {
		--header-height: 165px;
	}
}
</style>
