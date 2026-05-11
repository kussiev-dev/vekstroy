<script setup lang="ts"></script>

<template>
	<NuxtPage />
	<MobileBottomNav />
	<ToastContainer />
</template>

<style lang="scss">
@media (max-width: 767px) {
	body {
		padding-bottom: calc(56px + env(safe-area-inset-bottom, 0px));
	}
}
</style>
