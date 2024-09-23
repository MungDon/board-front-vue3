<template>
  <section class="editor_box">
    <QuillEditor />
  </section>
</template>
<script setup>
import ImageUploader from 'quill-image-uploader';
const modules = {
  name: 'imageUploader',
  module: ImageUploader
};
</script>

<style scoped></style>
