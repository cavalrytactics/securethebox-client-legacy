// Internet Explorer 11 requires polyfills and partially supported by this project.
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'typeface-muli';
import './react-table-defaults';
import './react-chartjs-2-defaults';
import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './i18n';
import App from 'app/App';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
serviceWorker.unregister();