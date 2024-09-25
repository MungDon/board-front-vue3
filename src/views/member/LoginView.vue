<template>
  <main class="member_login_con">
    <section class="member_login_box">
      <article class="member_login_content">
        <InputTextComponent
          :ex-text="'아이디를 입력하세요'"
          v-model="memberLoginObj.email"
        />
        <InputPasswordComponent
          ex-text="'비밀번호를 입력하세요'"
          v-model="memberLoginObj.password"
        />
        <ButtonComponent :button-tag="'로그인'" @click="memberLogin" />
        <RouterLink :to="`/member/join`">회원가입</RouterLink>
      </article>
    </section>
  </main>
</template>

<script setup>
import InputTextComponent from '@/components/InputTextComponent.vue';
import InputPasswordComponent from '@/components/InputPasswordComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import axios from 'axios';
import { RouterLink } from 'vue-router';
import { reactive, getCurrentInstance } from 'vue';

const { appContext } = getCurrentInstance();
const $swalCall = appContext.config.globalProperties.$swalCall;
const memberLoginObj = reactive({
  email: '',
  password: ''
});

const memberLogin = () => {
  axios.post('/api/login', memberLoginObj).catch((error) => {
    $swalCall({
      title: '실패',
      text: error.response.data.message,
      icon: 'error'
    });
  });
};
</script>

<style scoped></style>
