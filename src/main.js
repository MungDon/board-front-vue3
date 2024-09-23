import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/init.css';
const app = createApp(App);
app.use(router);
app.mount('#app');
