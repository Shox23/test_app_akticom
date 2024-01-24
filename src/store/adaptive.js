import { defineStore } from "pinia";
import { ref } from "vue";

export const adaptiveStore = defineStore("adaptiveStore", () => {
  const windowWidth = ref(0);

  const resizeWidth = () => {
    window.addEventListener("resize", () => {
      windowWidth.value = window.innerWidth;
    });
  };

  const setWidth = (value) => {
    windowWidth.value = value
  }

  return { windowWidth, resizeWidth, setWidth };
});
