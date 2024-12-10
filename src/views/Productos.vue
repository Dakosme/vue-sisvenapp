<template>
    <div class="container">
      <h1 class="text-start">Listado Productos |
        <button @click="newProducto()"
          class="btn btn-success mx-2">
          <font-awesome-icon icon="plus" />
        </button>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Categoria</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Precio</th>
            <th scope="col">Stock</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto, index) in productos" :key="index">
            <th scope="row">{{index + 1}}</th>
            <td>{{producto.producto_name}}</td>
            <td>{{producto.categoria_id}}</td>
            <td>{{producto.proveedor_id}}</td>
            <td>{{producto.precio_producto}}</td>
            <td>{{producto.cantidad_stock}}</td>
            <td>
              <button @click="deleteProducto(producto.id)"
                class="btn btn-danger mx-2">
                <font-awesome-icon icon="trash" />
              </button>
              <button @click="editProducto(producto.id)"
                class="btn btn-warning mx-2">
                <font-awesome-icon icon="pencil" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  export default {
    name: 'Productos',
    components: {
      'font-awesome-icon': FontAwesomeIcon
    },
    data() {
      return {
        productos: []
      };
    },
    mounted() {
      this.fetchProductos();
    },
    methods: {
      fetchProductos() {
        axios
          .get('http://127.0.0.1:8001/api/producto')
          .then(response => {
            console.log(response.data);
            this.productos = response.data.productos;
          });
      },
      newProducto() {
        this.$router.push({ name: 'NewProducto' });
      },
      deleteProducto(id) {
        Swal.fire({
          title: `¿Quieres eliminar el producto con id ${id}?`,
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://127.0.0.1:8000/api/producto/${id}`)
              .then(response => {
                Swal.fire('¡Eliminado!', '', 'success');
                this.fetchProductos();
              });
          }
        });
      },
      editProducto(id) {
        this.$router.push({ name: 'EditarProducto', params: { id: `${id}` } });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para la vista de productos */
  </style>
  