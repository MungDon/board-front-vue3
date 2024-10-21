<template>
  <header class="header_con">
    <div class="header_box">
      <ul class="menu">
        <li>
          <ButtonComponent
            v-if="!isLogin"
            :button-tag="'로그인'"
            @click="loginLink"
          />
          <ButtonComponent
            v-if="isLogin"
            :button-tag="'로그아웃'"
            @click="logout"
          />
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue';
import { useStore } from 'vuex';
import router from '@/router';
import { computed, inject } from 'vue';
const store = useStore();
const swalCall = inject('$swalCall');
const isLogin = computed(() => store.getters.isLogin);
const logout = () => {
  store.dispatch('logout', {
    swalCall: swalCall
  });
};
const loginLink = () => {
  router.push('/member/login');
};
</script>

<style scoped></style>
