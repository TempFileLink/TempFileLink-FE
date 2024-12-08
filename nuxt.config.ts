// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    'shadcn-nuxt',
    '@nuxt/icon',
    '@vueuse/motion/nuxt',
    '@vee-validate/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBase: '',
    },
  },
});
