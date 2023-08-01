// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        {
          name: 'description',
          content: 'Get thumbnail images from any public video URL via API or browser.',
        },
        { property: 'title', content: 'Video Thumbnail API' },
        {
          property: 'description',
          content: 'Get thumbnail images from any public video URL via API or browser.',
        },
        { property: 'og:title', content: 'Video Thumbnail API' },
        { property: 'og:image', content: 'https://301redirect.to/images/og.jpg' },
        { property: 'og:image:alt', content: 'Video Thumbnail API' },
        {
          property: 'og:description',
          content: 'Get thumbnail images from any public video URL via API or browser.',
        },
        { property: 'og:url', content: 'https://301redirect.to/images/og.jpg' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:title', content: 'Video Thumbnail API' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:creator', content: '@timb03' },
        { name: 'twitter:image', content: 'https://thumbnail.video/images/og.jpg' },
        {
          name: 'twitter:description',
          content: 'Get thumbnail images from any public video URL via API or browser.',
        },
      ],
      script: [
        {
          src: 'https://plausible.io/js/plausible.js',
          defer: true,
          'data-domain': 'thumbnail.video',
        },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>📹</text></svg>',
        },
      ],
    },
  },
})