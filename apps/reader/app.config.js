const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const appJson = require('./app.json');

module.exports = {
  ...appJson.expo,
  extra: {
    ...(appJson.expo.extra || {}),
    apiUrl: process.env.EXPO_PUBLIC_API_URL,
  },
};