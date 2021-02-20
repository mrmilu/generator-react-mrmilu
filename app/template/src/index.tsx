import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.component';
import './assets/reset.scss';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (process.env.NODE_ENV === 'development' && import.meta?.hot) {
  import.meta.hot.accept();
}