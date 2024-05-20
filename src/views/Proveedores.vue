<template>
    <div class="container">
      <h1 class="text-start">Listado Proveedores |
        <button @click="newProveedor()"
          class="btn btn-success mx-2">
          <font-awesome-icon icon="plus" />
        </button>
      </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Nombre Contacto</th>
            <th scope="col">Celular</th>
            <th scope="col">Email</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(proveedor, index) in proveedores" :key="index">
            <th scope="row">{{index + 1}}</th>
            <td>{{proveedor.proveedor_nombre}}</td>
            <td>{{proveedor.proveedor_nombre_contacto}}</td>
            <td>{{proveedor.proveedor_celular}}</td>
            <td>{{proveedor.proveedor_email}}</td>
            <td>
              <button @click="deleteProveedor(proveedor.id)"
                class="btn btn-danger mx-2">
                <font-awesome-icon icon="trash" />
              </button>
              <button @click="editProveedor(proveedor.id)"
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
    name: 'proveedores',
    components: {
      'font-awesome-icon': FontAwesomeIcon
    },
    data() {
      return {
        proveedores: []
      };
    },
    mounted() {
      axios
        .get('http://127.0.0.1:8001/api/proveedor')
        .then(response => {
          console.log(response.data);
          this.proveedores = response.data.proveedores;
        });
    },
    methods: {
      newProveedor() {
        this.$router.push({ name: 'NewProveedor' });
      },
      deleteProveedor(id) {
        Swal.fire({
          title: `¿Quieres eliminar el proveedor con id ${id}?`,
          showCancelButton: true,
          confirmButtonText: 'Eliminar',
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://127.0.0.1:8000/api/proveedor/${id}`)
              .then(response => {
                Swal.fire('¡Eliminado!', '', 'success');
                this.fetchProveedores();
              });
          }
        });
      },
      editProveedor(id) {
        this.$router.push({ name: 'EditProveedor', params: { id: `${id}` } });
      },
      fetchProveedores() {
        axios
          .get('http://127.0.0.1:8000/api/proveedor')
          .then(response => {
            this.proveedores = response.data.proveedores;
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos para la vista de proveedores */
  </style>
  