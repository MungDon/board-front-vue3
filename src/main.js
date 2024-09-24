import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/init.css';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Swal from 'sweetalert2';
const app = createApp(App);

const defaultThenFn = () => {
  return;
};

app.config.globalProperties.$swalCall = (swalObj) => {
  Swal.fire({
    title: swalObj.title,
    html: swalObj.text,
    icon: swalObj.icon,
    confirmButtonText: swalObj.confirmButtonText ?? '확인',
    showCancelButton: swalObj.showCancelButton ?? false,
    cancelButtonText: swalObj.cancelButtonText ?? '아니요'
  }).then((result) => {
    if (typeof swalObj.thenFn === 'function') {
      swalObj.thenFn(result); // 사용자 정의 함수 호출
    } else {
      defaultThenFn(); // 기본 함수 호출
    }
  });
};
app.component('QuillEditor', QuillEditor); // Quill 에디터를 전역 컴포넌트로 등록
app.use(router);
app.mount('#app');
