import React from "react";
import ReactDOM from "react-dom/client";
import "./global.main.css";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./store/store";
import { CurrentContextProvider } from "./context/currentContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <CurrentContextProvider>
          <App />
        </CurrentContextProvider>
    </PersistGate>
  </Provider>
);
