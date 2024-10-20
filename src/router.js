import { createRouter, createWebHistory } from 'vue-router';
import HomeAdoptante from './views/HomeA.vue';
import HomeRefugio from './views/HomeR.vue';
import Index from './views/Index.vue';
import UserLogin from './views/Login.vue';
import UserPets from './views/Pets.vue';
import ProfileRefugio from './views/ProfileR.vue';
import CustomerReviews from './views/Review.vue';
import CalendarAdoptante from './views/CalendarA.vue';
import PetsRefugio from './views/PetsR.vue';



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
    path: '/HomeR',
    name: 'HomeR',
    component: HomeRefugio
  },
  { path: '/HomeA',
    name: 'HomeA',
    component: HomeAdoptante
  },
  {
    path: '/profileR',
    name: 'ProfileR',
    component: ProfileRefugio
  },

  { path: '/CalendarA',
    name: 'CalendarA',
    component: CalendarAdoptante
  },

  { path: '/PetsR',
    name: 'PetsR',
    component: PetsRefugio
  }


];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
