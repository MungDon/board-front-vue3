<template>
  <main class="board_list_con">
    <section class="board_list_button_box">
      <RouterLink :to="`/board/add`">등록</RouterLink>
    </section>
    <section class="board_list_box" v-if="boardListData.boardList.length != 0">
      <article class="board_list_head content">
        <div>No.</div>
        <div>제목</div>
        <div>작성자</div>
        <div>등록일/수정일</div>
      </article>
      <article
        class="board_list_body content"
        v-for="item in boardListData.boardList"
        :key="item.boardSid"
      >
        <div>{{ item.boardSid }}</div>
        <div>
          <RouterLink :to="`/board/detail/${item.boardSid}`">{{
            item.title
          }}</RouterLink>
        </div>
        <div>{{ item.memberName }}</div>
        <div>{{ item.createdDate }} / {{ item.modifiedDate }}</div>
      </article>
      <article class="board_list_pagination">
        <ButtonComponent
          :child-class="'prevButton'"
          :button-tag="'이전'"
          @click="changePage(boardListData.currentPage - 1)"
          :disabled="boardListData.currentPage === 1"
        />
        <span v-for="page in totalPages" :key="page">
          <ButtonComponent
            @click="changePage(page)"
            :child-class="
              page === boardListData.currentPage ? 'active' : 'inactive'
            "
            :button-tag="page"
            :child-disabled="page === boardListData.currentPage"
          />
        </span>
        <ButtonComponent
          :child-class="'prevButton'"
          :button-tag="'다음'"
          @click="changePage(boardListData.currentPage + 1)"
          :disabled="boardListData.currentPage === boardListData.endPage"
        />
      </article>
    </section>
    <section class="board_list_box" v-if="boardListData.boardList.length == 0">
      <div>등록된 게시글이 없어요</div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, reactive, inject } from 'vue';
import { RouterLink } from 'vue-router';
import ButtonComponent from '@/components/ButtonComponent.vue';
import axios from 'axios';
const swalCall = inject('$swalCall');
const boardListData = reactive({
  currentPage: 0,
  startPage: 0,
  endPage: 0,
  boardList: []
});
const totalPages = computed(() => {
  const pages = [];
  for (let i = boardListData.startPage; i <= boardListData.endPage; i++) {
    pages.push(i);
  }
  return pages;
});
const changePage = (pageNum) => {
  if (pageNum < 1 || pageNum > boardListData.endPage) return; // 유효한 페이지 범위 체크
  fetchBoardList(pageNum - 1); // 0부터 시작하는 페이지 번호에 맞게 -1
};
const fetchBoardList = (pageNum = 0) => {
  axios
    .get('/api/board', {
      params: { page: pageNum },
      withCredentials: true // 쿠키를 포함시키기 위해 추가
    })
    .then(({ data }) => {
      if (data.success) {
        console.log(data.message);
        boardListData.currentPage = data.data.currentPage;
        boardListData.startPage = data.data.startPage;
        boardListData.endPage = data.data.endPage;
        boardListData.boardList = data.data.boardList;
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
  fetchBoardList();
});
</script>

<style scoped></style>
