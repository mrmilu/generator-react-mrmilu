module.exports = {
  env: {
    test: {
      presets: ['@babel/preset-env']
    }
  },
  presets: ['@babel/preset-react', '@babel/preset-typescript'],
  plugins: ['babel-plugin-macros', '@babel/plugin-transform-react-jsx', 'babel-plugin-styled-components', 'polished']
};
