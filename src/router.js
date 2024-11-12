import { createRouter, createWebHistory } from 'vue-router';
import AdminHome from './views/Admin.vue';
import CalendarAdoptante from './views/CalendarA.vue';
import CalendarRefugio from './views/CalendarR.vue';
import GestPets from './views/GetsPet.vue';
import HomeAdoptante from './views/HomeA.vue';
import HomeRefugio from './views/HomeR.vue';
import Index from './views/Index.vue';
import UserLogin from './views/Login.vue';
import UserPets from './views/Pets.vue';
import PetsAdoptante from './views/PetsA.vue';
import PetsRefugio from './views/PetsR.vue';
import ProfileAdoptante from './views/ProfileA.vue';
import ProfileAdmin from './views/ProfileAdmin.vue';
import ProfileRefugio from './views/ProfileR.vue';
import CustomerReviews from './views/Review.vue';
import ReviewsAdoptante from './views/ReviewsA.vue';
import ReviewsAdmin from './views/ReviewsAdmin.vue';
import UsersAdmin from './views/UsersA.vue';
import ReviewsRefugio from './views/ReviewsR.vue';

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
  {
    path: '/profileR',
    name: 'ProfileR',
    component: ProfileRefugio
  },
  {
    path: '/profileA',
    name: 'ProfileA',
    component: ProfileAdoptante
  },
  {
    path: '/PetsR',
    name: 'PetsR',
    component: PetsRefugio
  },
  {
    path: '/HomeA',
    name: 'HomeA',
    component: HomeAdoptante
  },
  {
    path: '/CalendarA',
    name: 'CalendarA',
    component: CalendarAdoptante
  },
  {
    path: '/CalendarR',
    name: 'CalendarR',
    component: CalendarRefugio
  },
  {
    path: '/PetsA',
    name: 'PetsA',
    component: PetsAdoptante
  },
  {
    path: '/ReviewsA',
    name: 'ReviewsA',
    component: ReviewsAdoptante
  },
  {
    path: '/ReviewsR',
    name: 'ReviewsR',
    component: ReviewsRefugio
  },
  {
    path: '/AdminH',
    name: 'AdminH',
    component: AdminHome
  },
  {
    path: '/gestpets',
    name: 'GestPets',
    component: GestPets
  },
  {
    path: '/profileAdmin',
    name: 'ProfileAdmin',
    component: ProfileAdmin
  },
  {
    path: '/reviewsAdmin',
    name: 'ReviewsAdmin',
    component: ReviewsAdmin
  },
  {
    path: '/usersAdmin',
    name: 'UsersAdmin',
    component: UsersAdmin
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
