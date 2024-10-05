import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { defineRule } from 'vee-validate';


defineRule('required', (value) => {
  return value ? true : 'Este campo es obligatorio';
});
createApp(App).use(router).mount('#app');
