<template>
  <main class="board_detail_con">
    <section class="board_detail_box">
      <article class="board_detail_title_user">
        <div>제목</div>
        <div>{{ boardDetailData.data.title }}</div>
        <div>작성자</div>
        <div>{{ boardDetailData.data.memberName }}</div>
      </article>
      <article class="board_detail_date">
        <div>등록일/수정일</div>
        <div>
          {{ boardDetailData.data.createdDate }}/{{
            boardDetailData.data.modifiedDate
          }}
        </div>
      </article>
      <article
        class="board_detail_content"
        v-html="boardDetailData.data.content"
      ></article>
    </section>
    <section class="board_detail_button_box">
      <RouterLink :to="`/board/update/${boardDetailData.data.boardSid}`"
        >수정</RouterLink
      >
      <ButtonComponent :button-tag="'삭제'" @click="boardDelete" />
    </section>
  </main>
</template>

<script setup>
import axios from 'axios';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { onMounted, reactive, inject } from 'vue';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';
import router from '@/router';

const route = useRoute();
const swalCall = inject('$swalCall');

const boardDetailData = reactive({
  data: {
    boardSid: 0,
    title: '',
    content: '',
    memberName: '',
    createdDate: null,
    modifiedDate: null
  }
});

onMounted(() => {
  const boardSid = route.params.board_sid;
  axios
    .get(`/api/board/detail/${boardSid}`)
    .then(({ data }) => {
      if (data.success) {
        console.log(data.message);
        boardDetailData.data = data.data;
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

const boardDelete = () => {
  swalCall({
    title: '게시글 삭제',
    text: '해당 게시글을 삭제 하시겠습니까?',
    icon: 'question',
    confirmButtonText: '예',
    showCancelButton: true,
    thenFn: (result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/board/delete/${boardDetailData.data.boardSid}`)
          .then(({ data }) => {
            if (data.success) {
              swalCall({
                title: '성공',
                text: data.message,
                icon: 'success',
                thenFn: () => {
                  router.push('/board');
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
      }
    }
  });
};
</script>

<style scoped></style>
