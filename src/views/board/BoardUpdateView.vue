<template>
  <main class="board_update_main">
    <section class="board_update_box">
      <InputText
        v-model="boardDetail.data.title"
        :ex-text="'제목을 입력하세요'"
      />
      <Editor v-model="boardDetail.data.content" />
      <ButtonComponent :button-tag="'수정'" @click="boardUpdate" />
      <ButtonComponent :button-tag="'취소'" @click="cancelUpdate" />
    </section>
  </main>
</template>

<script setup>
import InputText from '@/components/InputTextComponent.vue';
import Editor from '@/components/QuillEditor.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { onMounted, getCurrentInstance, reactive } from 'vue';

const { appContext } = getCurrentInstance();
const $swalCall = appContext.config.globalProperties.$swalCall;
const route = useRouter();
const boardDetail = reactive({
  data: {
    boardSid: 0,
    title: '',
    content: ''
  }
});
const boardUpdate = () => {
  axios.put('/api/board/update', boardDetail.data).then();
};
onMounted(() => {
  const boardSid = route.param.board_sid;
  axios
    .get(`/api/board/detail/${boardSid}`)
    .then(({ response }) => {
      if (response.success) {
        console.log(response.message);
        boardDetail.data = response.data;
      }
    })
    .catch((error) => {
      $swalCall({
        title: '실패',
        text: error.response.data.message,
        icon: 'error'
      });
    });
});
</script>

<style scoped></style>
