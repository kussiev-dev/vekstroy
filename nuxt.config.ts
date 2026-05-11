// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  modules: [
    "@nuxt/image",
    "vue3-carousel-nuxt",
    "@pinia/nuxt",
  ],
  css: ["~/assets/styles/style.scss"],
  app: {
    baseURL: "/vekstroy/",
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
});
