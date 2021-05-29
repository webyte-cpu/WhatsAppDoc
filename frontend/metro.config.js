const MetroConfig = require('@ui-kitten/metro-config');
const expoConfig = require('@expo/metro-config')
const evaConfig = {
  evaPackage: '@eva-design/eva',
  customMappingPath: './mapping.json',
};

module.exports = MetroConfig.create(evaConfig, {
  // Whatever was previously specified
});