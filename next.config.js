/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [ 'courses-top.ru' ]
  },

  //svgr
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      },
    )

    return config
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
}

module.exports = nextConfig
