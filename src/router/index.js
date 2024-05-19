import { createRouter, createWebHashHistory } from 'vue-router'

import EditarCategoria from '../components/categorias/EditarCategoria.vue';
import NewCategoria from '../components/categorias/NewCategoria.vue';
import Categorias from '../views/Categorias.vue';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

