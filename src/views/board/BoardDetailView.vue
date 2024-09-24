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
      <ButtonComponent :button-tag="'수정'" @click="boardUpdate" />
      <ButtonComponent :button-tag="'삭제'" @click="boardDelete" />
    </section>
  </main>
</template>

<script setup>
import axios from 'axios';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { getCurrentInstance, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

const { appContext } = getCurrentInstance();
const $swalCall = appContext.config.globalProperties.$swalCall;
const route = useRoute();

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
    .then(({ response }) => {
      if (response.success) {
        console.log(response.message);
        boardDetailData.data = response.data;
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
const boardDelete = () => {
  $swalCall({
    title: '게시글 삭제',
    text: '해당 게시글을 삭제 하시겠습니까?',
    icon: 'question',
    confirmButtonText: '예',
    showCancelButton: true,
    thenFn: (result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/board/delete/${boardDetailData.data.boardSid}`)
          .then(({ response }) => {
            if (response.success) {
              $swalCall({
                title: '성공',
                text: response.message,
                icon: 'success',
                thenFn: () => {
                  route.push('/board/list');
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
      }
    }
  });
};
const boardUpdate = () => {
  route.push(`/board/update/${boardDetailData.data.boardSid}`);
};
</script>

<style scoped></style>
