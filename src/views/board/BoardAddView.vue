<template>
  <main class="board_add_main">
    <section class="board_add_box">
      <input-text v-model="boardAddObj.title" :ex-text="'제목을 입력하세요'" />
      <editor @update:value="bindingContent" />
      <addButton :button-tag="'등록'" @click="boardAdd" />
    </section>
  </main>
</template>

<script setup>
import editor from '@/components/QuillEditor.vue';
import addButton from '@/components/ButtonComponent.vue';
import inputText from '@/components/InputTextComponent.vue';
import axios from 'axios';
import { reactive, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { appContext } = getCurrentInstance();
const $swalCall = appContext.config.globalProperties.$swalCall;
const boardAddObj = reactive({
  title: '',
  content: ''
});
const bindingContent = (value) => {
  boardAddObj.content = value;
};

const boardAdd = () => {
  axios
    .post('/api/board/add', boardAddObj)
    .then(({ response }) => {
      if (response.success) {
        const swalObj = {
          title: '성공',
          text: response.message,
          icon: 'success',
          thenFn: () => {
            router.push('/board/list');
          }
        };
        $swalCall(swalObj);
      }
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
};
</script>

<style scoped></style>
