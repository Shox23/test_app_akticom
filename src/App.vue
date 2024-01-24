<template>
  <div class="app">
    <Sidebar />
    <div class="layout">
      <Navbar v-if="route.fullPath == '/'" />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";
import { adaptiveStore } from "./store/adaptive";
import { useRoute } from "vue-router";

const route = useRoute();
const store = adaptiveStore();
onMounted(() => {
  store.setWidth();
  store.resizeWidth();
});
</script>
