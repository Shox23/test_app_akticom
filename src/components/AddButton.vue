<template>
  <button @click="$emit('onClick')" title="Добавить клиента" class="add-button">
    +
  </button>
</template>

<script setup></script>

<style lang="scss" scoped>
.add-button {
  cursor: pointer;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-weight: 900;
  font-size: 32px;
  position: fixed;
  right: 5%;
  bottom: 5%;
  border: none;
  box-shadow: 0 0 5px #f0f3f4;
  border-radius: 15px;
  color: #f0f3f4;
  background: #191742f3;
  transition: 0.3s;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
