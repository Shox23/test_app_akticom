import { defineStore } from "pinia";
import { ref } from "vue";

export const clientStore = defineStore("clientStore", () => {
  const clientList = ref([]);
  const renderList = ref([]);
  const loading = ref(false);
  const url = "https://c3fce92e2c9889b0.mokky.dev/clients";

  const fetchClients = async () => {
    loading.value = true;
    const response = await fetch(url);
    if (response.ok) {
      const results = await response.json();
      if (results) {
        results.forEach((item) => {
          if (!clientList.value.find((i) => i.id == item.id))
            clientList.value.push(item);
        });
        getLocalUsers();
        if (clientList.value.length) {
          renderList.value = clientList.value;
          loading.value = false;
        }
      }
    }
  };

  const getLocalUsers = () => {
    if (localStorage.newClients) {
      const localClients = JSON.parse(localStorage.newClients);
      localClients.forEach((item) => {
        if (!clientList.value.find((i) => i.id == item.id))
          clientList.value.push(item);
      });
    }
  };

  const filterClients = (val) => {
    if (val == "all") {
      renderList.value = clientList.value;
    } else {
      renderList.value = clientList.value.filter((item) => item.status == val);
    }
  };

  const addClient = (val) => {
    if (
      !clientList.value.find((i) => i.id == val.id) &&
      !renderList.value.find((i) => i.id == val.id)
    ) {
      renderList.value.push(val);
    }
  };

  const findClient = (val) => {
    renderList.value = renderList.value.filter((item) =>
      item.fullname.includes(val)
    );
  };

  const deleteUser = (id) => {
    clientList.value = clientList.value.filter((item) => item.id !== id);
    renderList.value = renderList.value.filter((item) => item.id !== id);
    if (localStorage.newClients) {
      let localClients = JSON.parse(localStorage.newClients);
      localClients = localClients.filter((item) => item.id != id);
      localStorage.newClients = JSON.stringify(localClients);
    }
  };

  return {
    fetchClients,
    deleteUser,
    filterClients,
    findClient,
    addClient,
    renderList,
    loading,
    clientList,
  };
});
