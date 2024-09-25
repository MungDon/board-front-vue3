<template>
  <button
    type="button"
    :class="childClass"
    :style="{
      width: childWidth,
      height: childHeight,
      backgroundColor: childColor
    }"
    :disabled="childDisabled"
  >
    {{ buttonTag }}
  </button>
</template>

<script setup>
defineProps({
  childWidth: String,
  childHeight: String,
  childColor: String,
  buttonTag: String,
  childClass: String,
  childDisabled: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped></style>
