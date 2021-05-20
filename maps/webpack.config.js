const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
    const config = await createExpoWebpackConfigAsync({
        ...env,
        resolve: {
          alias: {
              
              'react-native-maps': 'react-native-web-maps'
          }
      }
    }, argv);
    return config;
};