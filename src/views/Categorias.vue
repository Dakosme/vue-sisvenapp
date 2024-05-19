<template>
  <div class="container">
    <h1 class="text-start">Listado Categorias |
      <button @click="newCategoria()"
        class="btn btn-success mx-2">
        <font-awesome-icon icon="plus" />
      </button>
    </h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripción</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(categoria, index) in categorias" :key="index">
          <th scope="row">{{index + 1}}</th>
          <td>{{categoria.categoria_id}}</td>
          <td>{{categoria.categoria_nombre}}</td>
          <td>{{categoria.categoria_descripcion}}</td>
          <td>
            <button @click="deleteCategoria(categoria.categoria_id)"
              class="btn btn-danger mx-2">
              <font-awesome-icon icon="trash" />
            </button>
            <button @click="editCategoria(categoria.categoria_id)"
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

export default {
  name: 'Categorias',
  data() {
    return {
      categorias: []
    };
  },
  mounted() {
    axios
      .get('http://127.0.0.1:8001/api/categoria')
      .then(response => {
        console.log(response.data);
        this.categorias = response.data.categorias;
      });
  },
  methods: {
    newCategoria() {
      this.$router.push({ name: 'NewCategoria' });
    },
    deleteCategoria(id) {
      Swal.fire({
        title: `Do you want to delete the Categoria with id ${id}?`,
        showCancelButton: true,
        confirmButtonText: 'Delete',
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://127.0.0.1:8001/api/categoria/${id}`)
            .then(response => {
              if (response.data.success) {
                Swal.fire('Deleted!', '', 'success');
                this.categorias = response.data.categorias;
              }
            });
        }
      });
    },
    editCategoria(id) {
      this.$router.push({ name: 'EditCategoria', params: { id: `${id}` } });
    }
  }
};
</script>

