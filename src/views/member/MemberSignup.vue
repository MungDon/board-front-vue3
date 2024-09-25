<template>
  <main class="member_signup_con">
    <section class="member_signup_box">
      <article class="member_signup_content_head">
        <h1>회원가입</h1>
      </article>
      <article class="member_signup_content_body">
        <InputTextComponent
          :ex-text="'사용하실 이메일을 입력하세요'"
          v-model="memberAddObj.email"
        /><InputPasswordComponent
          :ex-text="'사용하실 비밀번호를 입력하세요'"
          v-model="memberAddObj.password"
        />
        <InputTextComponent
          :ex-text="'사용하실 회원명을 입력해주세요'"
          v-model="memberAddObj.name"
        />
      </article>
    </section>
    <section class="member_signup_button_box">
      <ButtonComponent :button-tag="'회원가입'" @click="memberAdd" />
      <RouterLink :to="`/member/login`">로그인하기</RouterLink>
    </section>
  </main>
</template>

<script setup>
import InputTextComponent from '@/components/InputTextComponent.vue';
import InputPasswordComponent from '@/components/InputPasswordComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import axios from 'axios';
import router from '@/router';
import { getCurrentInstance, reactive } from 'vue';
import { RouterLink } from 'vue-router';

const { appContext } = getCurrentInstance();
const $swalCall = appContext.config.globalProperties.$swalCall;

const memberAddObj = reactive({
  email: '',
  password: '',
  name: ''
});

const memberAdd = () => {
  axios
    .post('/api/member/join', memberAddObj)
    .then(({ data }) => {
      if (data.success) {
        $swalCall({
          title: '성공',
          text: data.message,
          icon: 'success',
          thenFn: () => {
            router.push('/member/login');
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
