<template>
  <button
    type="button"
    :style="{
      width: childWidth,
      height: childHeight,
      backgroundColor: childColor
    }"
  >
    {{ buttonTag }}
  </button>
</template>

<script setup>
defineProps({
  childWidth: String,
  childHeight: String,
  childColor: String,
  buttonTag: String
});
</script>

<style scoped></style>
