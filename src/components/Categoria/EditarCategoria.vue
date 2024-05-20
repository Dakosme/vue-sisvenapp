<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Editar</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Categoria
        </div>
        <div class="card-body">
          <form @submit.prevent="updateCategoria">
            <div class="row mb-3">
              <label for="categoria_id" class="form-label">Código</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="tag" />
                </div>
                <input type="text" class="form-control" id="categoria_id" placeholder="Código categoría" disabled v-model="categoria.categoria_id">
              </div>
            </div>
  
            <div class="row mb-3">
              <label for="categoria_nombre" class="form-label">Nombre</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="building" />
                </div>
                <input type="text" class="form-control" id="categoria_nombre" placeholder="Nombre categoría" v-model="categoria.categoria_nombre">
              </div>
            </div>
  
            <div class="row mb-3">
              <label for="categoria_descripcion" class="form-label">Descripción</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="pencil" />
                </div>
                <input type="text" class="form-control" id="categoria_descripcion" placeholder="Descripción categoría" v-model="categoria.categoria_descripcion">
              </div>
            </div>
  
            <button class="btn btn-primary" type="submit">Actualizar</button>
            <button class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  export default {
    name: 'EditarCategoria',
    components: {
      'font-awesome-icon': FontAwesomeIcon
    },
    data() {
      return {
        categoria: {
          categoria_id: '',
          categoria_nombre: '',
          categoria_descripcion: ''
        }
      };
    },
    methods: {
      cancelar() {
        this.$router.push({ name: 'Categorias' });
      },
      async updateCategoria() {
        const res = await axios.put(`http://127.0.0.1:8001/api/categoria/${this.categoria.categoria_id}`, this.categoria);
        if (res.status === 200) {
          this.$router.push({ name: 'Categorias' });
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Categoria ha sido actualizada',
            showConfirmButton: false,
            timer: 2000
          });
        }
      }
    },
    mounted() {
      const id = this.$route.params.id;
      axios.get(`http://127.0.0.1:8001/api/categoria/${id}`)
        .then(response => {
          this.categoria = response.data.categoria;
        })
        .catch(error => {
          console.error("Hubo un error al obtener la categoría:", error);
        });
    }
  };
  </script>
  