import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import carroReducer from "./store/cartSlice";
import App from "./App.jsx";
import "./index.css";

const appStore = configureStore({
  reducer: {
    carro: carroReducer,
  },
});

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={appStore}>
      <App />
    </Provider>
  </StrictMode>
);
