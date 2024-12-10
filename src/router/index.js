import { createRouter, createWebHashHistory } from 'vue-router'

import EditarCategoria from '../components/Categoria/EditarCategoria.vue';
import NewCategoria from '../components/Categoria/NewCategoria.vue';
import Categorias from '../views/Categorias.vue';
import HomeView from '@/views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import Proveedores from '../views/Proveedores.vue';
import Productos from '../views/Productos.vue';
import MetodoPago from '../views/MetodoPago.vue';


const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: Categorias
  },
  {
    path: '/editar-categoria/:id',
    name: 'EditarCategoria',
    component: EditarCategoria
  },
  {
    path: '/add-categoria',
    name: 'NewCategoria',
    component: NewCategoria
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView
  },
  {
  path: '/proveedor',
  name: 'Proveedor',
  component: Proveedores
  },
  {
    path: '/producto',
    name: 'Producto',
    component: Productos
  },
  {
    path: '/metodo_pago',
    name: 'Metodo_Pago',
    component: MetodoPago
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

