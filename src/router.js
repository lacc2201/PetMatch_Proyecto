import { createRouter, createWebHistory } from 'vue-router';
import HomeUsuario from './views/HomeU.vue';
import HomeVendedor from './views/HomeV.vue';
import Index from './views/Index.vue';
import UserLogin from './views/Login.vue';
import UserPets from './views/Pets.vue';
import ProfileVendedor from './views/ProfileV.vue';
import CustomerReviews from './views/Review.vue';


const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: UserLogin
  },
  {
    path: '/Pets',
    name: 'Pets',
    component: UserPets
  },
  {
    path: '/Reviews',
    name: 'Reviews',
    component: CustomerReviews
  },
  {
    path: '/HomeV',
    name: 'HomeV',
    component: HomeVendedor
  },
  {
    path: '/profileV',
    name: 'ProfileV',
    component: ProfileVendedor
  },
  { path: '/HomeU',
    name: 'HomeU',
    component: HomeUsuario },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
