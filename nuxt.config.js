
const env = require('dotenv').config()

const client = require('./plugins/contentful')


export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  env: env.parsed,
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/images/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', href: '/images/favicon-16x16.png' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.1/styles/hopscotch.min.css' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFC25C' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/css/tailwind.css', 
    '~/assets/css/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/contentful',
    '~/plugins/day',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/svg',
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit',
    ['@nuxtjs/sitemap',{
      path: '/sitemap.xml',
      hostname: 'https://mykeel.dev',
      generate: true,
      routes:[
        {
          url: '/',
          changefreq: 'daily',
          priority: 1,
          lastmod: '2020-06-30T13:30:00.000Z'
        },
        {
          url: '/blog',
          changefreq: 'daily',
          priority: 1,
          lastmod: '2020-06-30T13:30:00.000Z'
        }
      ]
    }]
  ],

  markdownit:{
    injected: true,
    use: [
      'markdown-it-highlightjs'
    ]
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },

  generate: {
    routes() {
      return client.getEntries({ content_type : 'post' })
      .then(entries =>{
        return entries.items.map(entry=>{
          return {
            route: entry.fields.slug,
            payload: entry
          }
        })
      })
    }
   },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
   extractcss:true,
    extend (config, ctx) {
    }
  }
}
