<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <img src="../assets/images/logo.png" alt="" />
    </div>
    <ul class="sidebar__menu">
      <li
        class="sidebar__menu__item"
        v-for="item in menuItems"
        :key="item"
        :title="`${store.windowWidth > 740 ? item.title : ''}`"
      >
        <router-link class="sidebar__menu__link" to="/">
          <span class="sidebar__menu__icon">
            <img :src="`/icons/${item.icon}.svg`" alt="icon" />
          </span>
          <span class="sidebar__menu__text">
            {{ item.title }}
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { adaptiveStore } from "../store/adaptive";

const store = adaptiveStore();
const menuItems = [
  {
    title: "Главная",
    icon: "home",
    link: "/",
  },
  {
    title: "Клиенты",
    icon: "clients",
    link: "/",
  },
  {
    title: "О нас",
    icon: "info",
    link: "/",
  },
  {
    title: "Настройки",
    icon: "settings",
    link: "/",
  },
  {
    title: "Выйти",
    icon: "logout",
    link: "/",
  },
];
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 40px;
  background: #0d0c22;

  @media (max-width: 500px) {
    padding: 10px;
  }

  @media (max-width: 400px) {
    padding: 4px;
  }

  &__logo {
    position: relative;

    img {
      width: 100%;
    }

    &::after {
      position: absolute;
      content: "";
      background: #f0f3f4;
      height: 1px;
      left: 0;
      bottom: -20%;
      width: 100%;
    }
  }

  &__menu {
    overflow-y: auto;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    &::-webkit-scrollbar {
      display: none;
    }

    &__item {
      padding: 0 20px;
      cursor: pointer;
      transition: 0.3s;
      border-radius: 50px;
      width: 100%;

      // background: #f0f3f4;
      // height: 70px;

      &:hover {
        background: #191742f3;
      }

      @media (max-width: 970px) {
        padding: 0 10px;
      }

      @media (max-width: 900px) {
        padding: 0 20px;
      }

      @media (max-width: 740px) {
        height: 70px;
        width: 70px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      @media (max-width: 550px) {
        aspect-ratio: 1;
        width: 100%;
        border-radius: 20px;
      }

      @media (max-width: 500px) {
        border-radius: 12px;
      }
    }

    &__icon {
      height: 24px;
      width: 24px;

      img {
        width: 100%;
      }

      @media (max-width: 900px) {
        height: 20px;
        width: 20px;
      }

      @media (max-width: 900px) {
        display: none;
      }

      @media (max-width: 740px) {
        display: block;
        height: 24px;
        width: 24px;
      }

      @media (max-width: 550px) {
        height: 20px;
        width: 20px;
      }
    }

    &__text {
      @media (max-width: 740px) {
        display: none;
      }
    }

    &__link {
      display: flex;
      align-items: center;
      height: 70px;
      width: 100%;
      transition: 0.3s;
      font-size: 20px;
      font-weight: 500;
      color: #f0f3f4;
      gap: 20px;

      @media (max-width: 1200px) {
        gap: 10px;
      }

      @media (max-width: 1050px) {
        font-size: 16px;
      }

      @media (max-width: 970px) {
        font-size: 16px;
      }

      @media (max-width: 900px) {
        font-size: 14px;
      }

      @media (max-width: 740px) {
        height: 70px;
        width: 70px;
        justify-content: center;
      }

      @media (max-width: 550px) {
        aspect-ratio: 1;
        width: 100%;
      }
    }
  }
}
</style>
