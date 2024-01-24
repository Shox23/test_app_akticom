<template>
  <div class="navbar">
    <CustonInput
      @updateData="changeIputValue"
      placeholder="Поиск"
      :model="inputValue"
      :is-dark="true"
      :has-icon="true"
    />
    <Dropdown :dropdownItems="dropdownItems" @change="changeFilter" />
  </div>
</template>

<script setup>
import Dropdown from "./Dropdown.vue";
import CustonInput from "./CustomInput.vue";
import { clientStore } from "../store";
import { ref } from "vue";

const store = clientStore();
const changeFilter = (val) => {
  store.filterClients(val);
};
const inputValue = ref("");

const changeIputValue = (val) => {
  inputValue.value = val;
  store.findClient(val);
};

const dropdownItems = [
  {
    title: "Все",
    value: "all",
  },
  {
    title: "Активные",
    value: "Активен",
  },
  {
    title: "Неактивные",
    value: "Неактивен",
  },
  {
    title: "Приостановленые",
    value: "Приостановлен",
  },
];
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 30px;
  padding: 20px;
  color: #f0f3f4;
  width: 100%;
  border-radius: 12px;
  background: #0d0c22;

  @media (max-width: 900px) {
    gap: 10px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
}
</style>
