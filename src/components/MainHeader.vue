<template>
  <header class="header_con">
    <div class="header_box">
      <ul class="menu">
        <li>
          <RouterLink to="/member/login">로그인</RouterLink>
        </li>
        <li>
          <button type="button" @click="logout">로그아웃</button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import axios from 'axios';
const logout = () => {
  axios
    .post('/api/member/logout', {
      withCredentials: true
    })
    .catch(() => {
      alert('로그아웃실패');
    });
};
</script>

<style scoped></style>
