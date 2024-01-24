<template>
  <div class="custom-input" :class="{ dark: isDark }">
    <input
      :inputmode="type == 'number'"
      :autofocus="autofocus"
      @input="$emit('updateData', $event.target.value)"
      :value="model"
      :type="type"
      :placeholder="placeholder"
      class="custom-input__input"
    />
    <span class="custom-input__icon" v-if="hasIcon">
      <img
        :src="`/src/assets/icons/${isDark ? 'search' : 'searchBlack'}.svg`"
        alt="icon"
      />
    </span>
  </div>
</template>

<script setup>
const emits = defineEmits(["updateData"]);
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  isDark: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "text",
  },
  hasIcon: {
    type: Boolean,
    default: false,
  },
  model: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.custom-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 10px 20px;
  color: #0d0c22;
  width: 100%;
  background: #f0f3f4;

  &__icon {
    height: 20px;
    width: 20px;
    img {
      height: 20px;
      width: 20px;
    }
  }

  &__input {
    border: none;
    outline: none;
    background: none;
    width: 100%;
    &::placeholder {
      color: #0d0c22;
    }

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  &.dark {
    color: #f0f3f4;
    background: #191742f3;

    .custom-input__input {
      color: #f0f3f4;

      &::placeholder {
        color: #f0f3f4;
      }
    }
  }
}
</style>
