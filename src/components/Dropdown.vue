<template>
  <div @click="isOpen = !isOpen" class="dropdown" :class="{ opened: isOpen }">
    <div class="dropdown__value">
      <span>
        {{ currentValue }}
      </span>

      <span class="dropdown__icon">
        <img src="/icons/arrow.svg" alt="icon" />
      </span>
    </div>

    <Transition
      name="expand"
      @enter="enter"
      @leave="leave"
      @after-enter="afterEnter"
    >
      <ul @click.stop class="dropdown__menu" v-if="isOpen">
        <li
          @click="changeValue(item.value)"
          class="dropdown__menu__item"
          v-for="item in dropdownItems"
          :key="item"
        >
          <span class="dropdown__menu__text">
            {{ item.title }}
          </span>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["change"]);
const isOpen = ref(false);
const props = defineProps({
  dropdownItems: {
    type: Array,
    default: [],
  },
});
const currentValue = ref(props.dropdownItems[0].title);

const enter = (element) => {
  const el = element;
  el.style.height = "auto";
  const height = getComputedStyle(el).height;
  el.style.height = "0";
  getComputedStyle(el);
  setTimeout(() => {
    el.style.height = height;
  });
};

const afterEnter = (element) => {
  const el = element;
  el.style.height = "auto";
};

const leave = (element) => {
  const el = element;
  el.style.height = getComputedStyle(el).height;
  getComputedStyle(el);
  setTimeout(() => {
    el.style.height = "0";
  });
};

const changeValue = (value) => {
  isOpen.value = false;
  currentValue.value = props.dropdownItems.find((i) => i.value === value).title;
  emit("change", value);
};
</script>

<style lang="scss" scoped>
.dropdown {
  width: 100%;
  max-width: 300px;
  position: relative;
  cursor: pointer;
  border-radius: 20px;
  padding: 10px 20px;
  background: #191742f3;

  @media (max-width: 600px) {
    max-width: 100%;
  }

  &__value {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 20px;
    height: 20px;
    transition: 0.3s ease-in;
  }

  &__menu {
    overflow: hidden;
    z-index: 99;
    background: #191742f3;
    width: 100%;
    position: absolute;
    top: 40px;
    border-radius: 0 0 20px 20px;
    left: 0;

    &__item {
      color: #f0f3f4;
      padding: 10px 20px;
      cursor: pointer;

      .dropdown__menu__text {
        position: relative;

        &::after {
          position: absolute;
          left: 0;
          bottom: 0;
          content: "";
          height: 2px;
          width: 0;
          transition: 0.3s ease-in;
          background: #f0f3f4;
        }
      }

      &:hover {
        .dropdown__menu__text::after {
          width: 100%;
        }
      }
    }
  }

  &.opened {
    border-radius: 20px 20px 0 0;
    .dropdown__icon {
      transform: rotate(180deg);
    }
  }
}

.expand-enter-active {
  transition: height 400ms cubic-bezier(0.01, 0.59, 0.25, 0.94);
  overflow: hidden;
}

.expand-enter-from {
  & .menu__list {
    transform: translateY(-20px);
    opacity: 0;
  }
}

.expand-leave-active {
  transition: height 100ms;
  overflow: hidden;
}
</style>
