<template>
  <main class="board_update_main">
    <section class="board_update_box">
      <InputText
        v-model="boardDetail.data.title"
        :ex-text="'제목을 입력하세요'"
      />
      <Editor
        v-model="boardDetail.data.content"
        @update:value="bindingContent"
      />
      <ButtonComponent :button-tag="'수정'" @click="boardUpdate" />
      <RouterLink :to="`/board/detail/${boardDetail.data.boardSid}`"
        >취소
      </RouterLink>
    </section>
  </main>
</template>

<script setup>
import InputText from '@/components/InputTextComponent.vue';
import Editor from '@/components/QuillEditor.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';
import { onMounted, reactive, inject } from 'vue';
import router from '@/router';

const swalCall = inject('$swalCall');
const route = useRoute();
const boardDetail = reactive({
  data: {
    boardSid: 0,
    title: '',
    content: ''
  }
});

const bindingContent = (value) => {
  boardDetail.data.content = value;
};

const boardUpdate = () => {
  axios
    .put('/api/board/update', boardDetail.data)
    .then(({ data }) => {
      if (data.success) {
        swalCall({
          title: '성공',
          text: data.message,
          icon: 'success',
          thenFn: () => {
            router.push(`/board/detail/${boardDetail.data.boardSid}`);
          }
        });
      }
    })
    .catch((error) => {
      swalCall({
        title: '실패',
        text: error.response.data.message,
        icon: 'error'
      });
    });
};

onMounted(() => {
  const boardSid = route.params.board_sid;
  axios
    .get(`/api/board/detail/${boardSid}`)
    .then(({ data }) => {
      if (data.success) {
        console.log(data.message);
        boardDetail.data = data.data;
        console.log(boardDetail.data.boardSid);
      }
    })
    .catch((error) => {
      swalCall({
        title: '실패',
        text: error.response.data.message,
        icon: 'error'
      });
    });
});
</script>

<style scoped></style>
