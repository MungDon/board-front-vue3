import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/init.css';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const app = createApp(App);
app.component('QuillEditor', QuillEditor); // Quill 에디터를 전역 컴포넌트로 등록
app.use(router);
app.mount('#app');
