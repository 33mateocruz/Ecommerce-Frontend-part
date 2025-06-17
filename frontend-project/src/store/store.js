import { configureStore } from "@reduxjs/toolkit";
import carroReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    carro: carroReducer,
  },
});

export default store;
