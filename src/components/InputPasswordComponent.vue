<template>
  <input
    type="password"
    class="input_password"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="exText"
    :style="{
      width: childWidth,
      height: childHeight
    }"
  />
</template>

<script setup>
defineProps({
  modelValue: String,
  exText: String,
  childWidth: String,
  childHeight: String
});
</script>

<style scoped></style>
