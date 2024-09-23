import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/member/login',
    name: '로그인',
    component: () => import('@/views/member/LoginView.vue')
  },
  {
    path: '/member/join',
    name: '회원가입',
    component: () => import('@/views/member/MemberSignup.vue')
  },
  {
    path: '/board/add',
    name: '게시글 등록',
    component: () => import('@/views/board/BoardAddView.vue')
  },
  {
    path: '/board',
    name: '게시판 목록',
    component: () => import('@/views/board/BoardListView.vue')
  },
  {
    path: '/board/detail/:board_sid',
    name: '게시글 상세',
    component: () => import('@/views/board/BoardDetailView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
