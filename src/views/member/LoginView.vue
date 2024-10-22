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
import { RouterLink } from 'vue-router';
import { reactive, inject } from 'vue';
import { useStore } from 'vuex'; // Vuex 스토어 사용을 위한 import

const swalCall = inject('$swalCall');
const store = useStore(); // Vuex 스토어에 접근

const memberLoginObj = reactive({
  email: '',
  password: ''
});

const memberLogin = () => {
  store.dispatch('login', {
    loginObj: memberLoginObj,
    swalCall: swalCall
  });
};
</script>

<style scoped></style>
