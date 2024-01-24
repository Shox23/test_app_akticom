<template>
  <div>
    <div>Client: {{ route.params.id }}</div>
    <h2>
      {{ currentClient.fullname }}
    </h2>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { clientStore } from "../store";

const route = useRoute();
const store = clientStore();
const currentClient = ref("");

const getClients = async () => {
  await store.fetchClients();
  currentClient.value = store.clientList.find(
    (item) => item.id == route.params.id
  );
};

onMounted(() => {
  if (store.clientList.length) {
    currentClient.value = store.clientList.find(
      (item) => item.id == route.params.id
    );
  } else {
    getClients();
  }
});
</script>

<style></style>