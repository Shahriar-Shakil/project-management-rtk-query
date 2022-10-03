import 'antd/dist/antd.css';
import React from 'react';
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store';
import './index.css';
import reportWebVitals from './reportWebVitals';

const options = {
    timeout: 5000,
    position: positions.TOP_RIGHT,
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AlertProvider
                template={AlertTemplate}
                timeout={options.timeout}
                position={options.position}
            >
                <App />
            </AlertProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
