<template>
  <button
    class="custom-btn"
    :class="{ disabled: disabled }"
    :disabled="disabled"
    @click="$emit('onClick')"
  >
    {{ title }}
  </button>
</template>

<script setup>
const emits = defineEmits(["onClick"]);
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.custom-btn {
  border: none;
  background: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-weight: 500;
  color: #f0f3f4;
  background: #0d0c22;
  cursor: pointer;
  transition: 0.3s ease-in;

  &.disabled {
    pointer-events: none;
    background: darkgray;
    color: #0d0c22;
  }

  &:hover {
    background: #191742f3;
  }
}
</style>
