import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import perm from './directives/perm'


const app = createApp(App);
app.directive('perm', perm);
app.use(createPinia());
app.use(router);
app.mount('#app');
