<template>
  <main class="board_add_main">
    <section class="board_add_box">
      <InputText v-model="boardAddObj.title" :ex-text="'제목을 입력하세요'" />
      <Editor @update:value="bindingContent" />
      <ButtonComponent :button-tag="'등록'" @click="boardAdd" />
    </section>
  </main>
</template>

<script setup>
import Editor from '@/components/QuillEditor.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import InputText from '@/components/InputTextComponent.vue';
import axios from 'axios';
import { reactive, getCurrentInstance } from 'vue';
import router from '@/router';

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
    .then(({ data }) => {
      if (data.success) {
        $swalCall({
          title: '성공',
          text: data.message,
          icon: 'success',
          thenFn: () => {
            router.push('/board/list');
          }
        });
      }
    })
    .catch((error) => {
      $swalCall({
        title: '실패',
        text: error.response.data.message,
        icon: 'error'
      });
    });
};
</script>

<style scoped></style>
