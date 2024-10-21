<template>
  <QuillEditor
    :modules="modules"
    toolbar="minimal"
    :value="props.modelValue"
    @update:content="updateContent"
  />
</template>
<script setup>
import ImageUploader from 'quill-image-uploader';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});
const content = ref('');
const emit = defineEmits(['update:value']);

const updateContent = (currentContent) => {
  content.value = currentContent;
  const delta = content.value; // Delta 형식 데이터
  const converter = new QuillDeltaToHtmlConverter(delta.ops); // Delta를 HTML로 변환하는 인스턴스 생성
  const htmlContent = converter.convert(); // 변환된 HTML 내용
  emit('update:value', htmlContent); // 변환된 HTML을 부모 컴포넌트로 전달
};

const modules = {
  name: 'imageUploader',
  module: ImageUploader
};
</script>

<style scoped></style>
