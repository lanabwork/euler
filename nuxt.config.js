module.exports = {
  ssr: false,
  /*
  ** Headers of the page
  */
  head: {
    title: 'euler',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [
    { src: '~assets/scss/main.scss', lang: 'scss' },
  ],
  styleResources: {
    scss: [
      '~assets/scss/mixins/*.scss',
      '~assets/scss/_variables.scss',
    ],
  },
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/axios',
  ],
  plugins: [
    '@/plugins/element-ui',
  ],
}

