<template>
  <Teleport to="body">
    <Transition>
      <div class="modal" @click="$emit('close')" v-if="isOpen">
        <div class="modal__content" @click.stop>
          <div class="modal__header" v-if="title">
            <h3>
              {{ title }}
            </h3>
          </div>
          <slot name="content"></slot>
          <div class="modal__controls" v-if="controlable">
            <CustomButton @onClick="$emit('cancel')" title="Отмена" />
            <CustomButton
              @onClick="$emit('submit')"
              :title="submitButtonTitle"
            />
          </div>
          <div class="modal__controls" v-else>
            <CustomButton @onClick="$emit('cancel')" title="Закрыть" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import CustomButton from "./CustomButton.vue";

const emits = defineEmits(["cancel", "close", "submit"]);
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  submitButtonTitle: {
    type: String,
    default: "",
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  controlable: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.modal {
  background: rgba($color: #000000, $alpha: 0.9);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &__header {
    width: 100%;
    position: relative;
    margin-bottom: 20px;

    &::after {
      position: absolute;
      content: "";
      background: #0d0c22;
      height: 1px;
      left: 0;
      bottom: -10px;
      width: 100%;
    }
  }

  &__content {
    padding: 20px;
    background: #f0f3f4;
    border-radius: 16px;
  }

  &__controls {
    position: relative;
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: flex-end;

    &::after {
      position: absolute;
      content: "";
      background: #0d0c22;
      height: 0.5px;
      left: 0;
      top: -20px;
      width: 100%;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
