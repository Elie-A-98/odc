/** @type {import('postcss').Config} */
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16,// 1rem = 16px
      unitPrecision: 5,
      propList: ['*'],// convert all properties
      selectorBlackList: [],
      minPixelValue: 2,// Don't convert 1px borders
      replace: true,
      mediaQuery: false,
      exclude: /node_modules/i,
    },
  },
};
