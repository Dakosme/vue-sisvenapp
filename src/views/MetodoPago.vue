<template>
  <div class="container">
    <h1 class="text-start">Listado Métodos de Pago |
      <button @click="newMetodoPago()"
        class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Observaciones</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(metodo, index) in metodos" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ metodo.metodo_pago_nombre }}</td>
          <td>{{ metodo.metodo_pago_observacion }}</td>
          <td>
            <button @click="deleteMetodoPago(metodo.id)"
              class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
            <button @click="editMetodoPago(metodo.id)"
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
  name: 'MetodoPago',
  components: {
    'font-awesome-icon': FontAwesomeIcon
  },
  data() {
    return {
      metodos: [] // Definimos la propiedad 'metodos' aquí
    };
  },
  mounted() {
    this.fetchMetodosPago();
  },
  methods: {
    fetchMetodosPago() {
      axios.get('http://127.0.0.1:8001/api/metodo_pago')
        .then(response => {
          this.metodos = response.data.metodos;
        })
        .catch(error => {
          console.error("Hubo un error al obtener los métodos de pago:", error);
        });
    },
    newMetodoPago() {
      this.$router.push({ name: 'NewMetodoPago' });
    },
    editMetodoPago(id) {
      this.$router.push({ name: 'EditarMetodoPago', params: { id } });
    },
    deleteMetodoPago(id) {
      Swal.fire({
        title: `¿Quieres eliminar el método de pago con id ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8000/api/metodo_pago/${id}`)
            .then(response => {
              Swal.fire('¡Eliminado!', '', 'success');
              this.fetchMetodosPago();
            })
            .catch(error => {
              console.error("Hubo un error al eliminar el método de pago:", error);
            });
        }
      });
    }
  }
};
</script>

<style scoped>
/* Estilos para la vista de métodos de pago */
</style>
