import { createSlice } from "@reduxjs/toolkit";

const carroSlice = createSlice({
  name: "carro",
  initialState: {
    articulos: [],
    comprasDeArticulos: [],
  },
  reducers: {
    agregarAlCarro: (state, action) => {
      const producto = action.payload;
      const productoExistente = state.articulos.find(
        (item) => item.id === producto.id
      );
      if (productoExistente) {
        productoExistente.cantidad += producto.cantidad;
      } else {
        state.articulos.push(producto);
      }
    },
    eliminarDelCarro: (state, action) => {
      state.articulos = state.articulos.filter(
        (item) => item.id !== action.payload
      );
    },
    finalizarCompra: (state, action) => {
      state.comprasDeArticulos = action.payload;
      state.articulos = [];
    },
    actualizarCantidad: (state, action) => {
      const { id, cantidad } = action.payload;
      const producto = state.articulos.find((item) => item.id === id);
      if (producto) {
        producto.cantidad = cantidad;
      }
    },
  },
});

export const {
  agregarAlCarro,
  eliminarDelCarro,
  finalizarCompra,
  actualizarCantidad,
} = carroSlice.actions;

export default carroSlice.reducer;
