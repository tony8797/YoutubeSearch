import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Routes from './router';
import "antd/dist/antd.css";
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <>
        <Routes />
      </>
    </Provider>
  );
}

export default App;
