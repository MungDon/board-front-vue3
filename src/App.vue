<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<script setup>
import { RouterView } from 'vue-router';
import Header from '@/components/MainHeader.vue';
import Footer from '@/components/MainFooter.vue';
</script>
<style></style>
