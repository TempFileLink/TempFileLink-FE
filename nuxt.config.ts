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
    '@sidebase/nuxt-auth',
  ],
  runtimeConfig: {
    public: {
      apiBase: '',
    },
  },
  auth: {
    globalAppMiddleware: true,
    baseURL: `${process.env.NUXT_PUBLIC_API_BASE}/api/`,
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: 'v1/user/login', method: 'post' },
        signOut: false,
        getSession: { path: 'v1/user/profile', method: 'get' },
      },
      pages: {
        login: '/login',
      },
      token: {
        signInResponseTokenPointer: '/token',
        type: 'Bearer',
        headerName: 'Authorization',
        maxAgeInSeconds: 60 * 60 * 24 * 3,
      },
    },
  },
});
