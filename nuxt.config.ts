// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@sidebase/nuxt-auth"],
  tailwindcss: {},
  appConfig: {
    github_client_id: process.env.GITHUB_CLIENT_ID,
    github_client_secret: process.env.GITHUB_CLIENT_SECRET,
  },
  auth: {
    provider: {
      type: "authjs",
    },
  },
});
