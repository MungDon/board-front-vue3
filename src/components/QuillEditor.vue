<template>
  <section class="editor_box">
    <QuillEditor
      :modules="modules"
      toolbar="minimal"
      @update:content="updateContent"
    />
  </section>
</template>
<script setup>
import ImageUploader from 'quill-image-uploader';
import { ref } from 'vue';
const content = ref('');
const emit = defineEmits(['update:value']);
const updateContent = (currentContent) => {
  content.value = currentContent;
  emit('update:value', content.value);
};
const modules = {
  name: 'imageUploader',
  module: ImageUploader
};
</script>

<style scoped></style>
