const path = require('path');

module.exports = {
    stories: ['../components/**/**/*.stories.[tj]s'],
    webpackFinal: async (config, { configType }) => {
        // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
        // You can change the configuration based on that.
        // 'PRODUCTION' is used when building the static version of storybook.

        // Make whatever fine-grained changes you need
        config.module.rules.push({
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          include: path.resolve(__dirname, '../'),
        });

      // absolute paths
      config.resolve.alias['components'] = path.join(
        path.resolve(__dirname, '../'),
        'components',
      );
      config.resolve.alias['services'] = path.join(
        path.resolve(__dirname, '../'),
        'services',
      );
      config.resolve.alias['assets'] = path.join(
        path.resolve(__dirname, '../'),
        'assets',
      );

        // Return the altered config
        return config;
      },
      addons: ['@storybook/addon-knobs/register', '@storybook/addon-storysource', '@storybook/addon-a11y/register']
};

