<template>
  <div class="home">
    <transition-group
      class="home__container"
      name="move"
      tag="div"
      v-if="!store.renderList.length && store.loading"
    >
      <ClientCardSkeleton v-for="item in 22" :key="item" />
    </transition-group>
    <transition-group
      class="home__container"
      name="list"
      tag="div"
      v-else-if="store.renderList.length && !store.loading"
    >
      <ClientCard
        v-for="item in store.renderList"
        :key="item"
        :item-details="item"
        @delete="openSubmitModal"
      />
    </transition-group>
    <div class="home__empty" v-else-if="true">
      <h2>Нет клиентов</h2>
    </div>

    <AddButton @onClick="modalOpen = !modalOpen" />

    <Modal
      submit-button-title="Добавить"
      :controlable="true"
      title="Добавить клиента"
      @close="cancelAction"
      @cancel="cancelAction"
      @submit="submitClient"
      :isOpen="modalOpen"
    >
      <template #content>
        <div class="home__content">
          <CustonInput
            @updateData="changeNameValue"
            placeholder="Полное имя"
            :model="nameValue"
            :is-dark="true"
          />
          <CustonInput
            @updateData="changeNumberValue"
            placeholder="Номер телефона"
            type="number"
            :model="numberValue"
            :is-dark="true"
          />
          <CustonInput
            @updateData="changeRegionValue"
            placeholder="Регион"
            :model="regionValue"
            :is-dark="true"
          />
        </div>
      </template>
    </Modal>

    <Modal
      title="Ошибка"
      @cancel="noticeText = ''"
      @close="noticeText = ''"
      :isOpen="!!noticeText"
      ><template #content>
        <div class="home__error">
          <h3>
            {{ noticeText }}
          </h3>
        </div>
      </template></Modal
    >

    <Modal
      :controlable="true"
      submit-button-title="Удалить"
      @submit="deleteClient"
      @cancel="chosenUser = null"
      @close="chosenUser = null"
      :isOpen="!!chosenUser"
      ><template #content>
        <div class="home__submit">
          <h3>
            {{ `Вы хотите удалить клиента ${chosenUser.fullname}?` }}
          </h3>
        </div>
      </template></Modal
    >
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import CustonInput from "../components/CustomInput.vue";
import AddButton from "../components/AddButton.vue";
import Modal from "../components/Modal.vue";
import ClientCard from "../components/ClientCard.vue";
import { clientStore } from "../store";
import ClientCardSkeleton from "../components/ClientCardSkeleton.vue";

const store = clientStore();
const noticeText = ref("");
const modalOpen = ref(false);
const chosenUser = ref(null);
const nameValue = ref("");
const regionValue = ref("");
const numberValue = ref("");

const changeNameValue = (val) => {
  nameValue.value = val.trim();
};

const changeNumberValue = (val) => {
  numberValue.value = val.trim();
};

const changeRegionValue = (val) => {
  regionValue.value = val.trim();
};

const getClients = async () => {
  setTimeout(async () => {
    await store.fetchClients();
  }, 100);
};

const openSubmitModal = (id) => [
  (chosenUser.value = store.clientList.find((item) => item.id == id)),
];

const deleteClient = () => {
  store.deleteUser(chosenUser.value.id);
  chosenUser.value = null;
};

const submitClient = () => {
  if (!nameValue.value.length) {
    noticeText.value = "Введите имя!";
    return;
  }
  if (numberValue.value.length !== 11) {
    noticeText.value = "Введите корректный номер телефона!";
    return;
  }
  if (!regionValue.value.length) {
    noticeText.value = "Введите регион!";
    return;
  }

  const newClient = {
    id: new Date().getTime(),
    fullname: nameValue.value,
    phone: numberValue.value,
    region: regionValue.value,
    created_at: new Date().toLocaleDateString(),
    status: "Активен",
  };

  if (localStorage.newClients) {
    const newClients = JSON.parse(localStorage.newClients);
    newClients.push(newClient);
    localStorage.newClients = JSON.stringify(newClients);
  } else {
    const newClients = [];
    newClients.push(newClient);
    localStorage.newClients = JSON.stringify(newClients);
  }
  store.addClient(newClient);
  cancelAction();
  noticeText.value = "Клиент добавлен!";
};

const cancelAction = () => {
  modalOpen.value = false;
  numberValue.value = "";
  nameValue.value = "";
  regionValue.value = "";
};

onMounted(() => {
  getClients();
});
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  min-height: fit-content;
  height: 100%;
  padding: 20px;
  border-radius: 12px;
  overflow: hidden;
  background: #0d0c22;

  &__empty {
    // height: 100%;
    width: max-content;
    // width: 100%;
    color: #f0f3f4;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
  }

  &__container {
    overflow: auto;
    height: 100%;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows:
      minmax(100px, max-content)
      repeat(auto-fill, auto-fill) 20%;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (max-width: 1200px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 900px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &__content {
    width: 300px;
    height: 180px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 400px) {
      width: 240px;
    }
  }

  &__error {
    width: 220px;
    height: 120px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 400px) {
      width: 200px;
    }
  }

  &__submit {
    width: 220px;
    height: 150px;
    padding: 10px 0 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 400px) {
      width: 200px;
    }
  }
}

.list-enter {
  transform: scale(0.5) translatey(-80px);
  opacity: 0;
}

.list-leave-to {
  transform: translatey(30px);
  opacity: 0;
}

.list-leave-active {
  position: absolute;
  z-index: -1;
}
</style>
