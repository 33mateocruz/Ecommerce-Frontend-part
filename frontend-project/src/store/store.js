import { configureStore } from "@reduxjs/toolkit";
import carroReducer from "./cartSlice";
import userAdminReducer from "./userAdminSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    carro: carroReducer,
    userAdmin: userAdminReducer,
    auth: authReducer,
  },
});

export default store;
