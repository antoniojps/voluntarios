const path = require('path');

require('dotenv').config();

module.exports = {
  webpack: config => {
    config.resolve.alias['components'] = path.join(__dirname, 'components');
    config.resolve.alias['services'] = path.join(__dirname, 'services');
    return config;
  },
  env: {
    DOMAIN: process.env.DOMAIN,
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
  },
};
