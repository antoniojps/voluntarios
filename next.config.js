const path = require('path');
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')

require('dotenv').config();

const config = {
  webpack: config => {
    config.resolve.alias['components'] = path.join(__dirname, 'components');
    config.resolve.alias['containers'] = path.join(__dirname, 'containers');
    config.resolve.alias['services'] = path.join(__dirname, 'services');
    config.resolve.alias['assets'] = path.join(__dirname, 'assets');
    config.resolve.alias['utils'] = path.join(__dirname, 'utils');
    config.resolve.alias['apollo'] = path.join(__dirname, 'apollo');
    return config;
  },
  env: {
    DOMAIN: process.env.DOMAIN,
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
}

module.exports = withSass(withCSS(config))