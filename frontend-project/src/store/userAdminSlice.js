import { createSlice } from "@reduxjs/toolkit";

const userAdminSlice = createSlice({
  name: "userAdmin",
  initialState: {
    users: [
      {
        id: 1,
        nombre: "Lucía Pérez",
        email: "lucia@example.com",
        estado: "activo",
        privilegios: "usuario",
      },
      {
        id: 2,
        nombre: "Carlos Gómez",
        email: "carlos@example.com",
        estado: "activo",
        privilegios: "admin",
      },
      {
        id: 3,
        nombre: "Ana Suárez",
        email: "ana@example.com",
        estado: "limitado",
        privilegios: "usuario",
      },
    ],
    products: [],
  },
  reducers: {
    toggleEstadoUsuario: (state, action) => {
      const user = state.users.find((u) => u.id === action.payload);
      if (user) {
        user.estado = user.estado === "activo" ? "limitado" : "activo";
      }
    },
    eliminarUsuario: (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
    registrarUsuario: (state, action) => {
      const maxId = Math.max(...state.users.map((user) => user.id));
      const newUser = {
        id: maxId + 1,
        nombre: action.payload.username,
        email: action.payload.email,
        estado: "activo",
        password: action.payload.password,
        privilegios: "usuario",
      };
      state.users.push(newUser);
    },
    agregarUsuarioConPrivilegios: (state, action) => {
      const maxId = Math.max(...state.users.map((user) => user.id));
      const newUser = {
        id: maxId + 1,
        nombre: action.payload.nombre,
        email: action.payload.email,
        estado: "activo",
        password: action.payload.password,
        privilegios: action.payload.privilegios,
      };
      state.users.push(newUser);
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
});

export const {
  toggleEstadoUsuario,
  eliminarUsuario,
  registrarUsuario,
  agregarUsuarioConPrivilegios,
  addProduct,
  deleteProduct,
  updateProduct,
} = userAdminSlice.actions;

export default userAdminSlice.reducer;
