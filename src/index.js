import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./api/redux/store";

import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import './styles/index.css';
import './styles/login.css';
import './styles/dashboard.css';
import './styles/modal.css';

// Find the root element in your HTML
const rootElement = document.getElementById('root');

// Create a root for rendering
const root = createRoot(rootElement);

// Render the App component
root.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
</Provider>
);
