import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '@store/config.ts';
import App from './App.tsx';
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
