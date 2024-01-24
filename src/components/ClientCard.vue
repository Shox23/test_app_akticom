<template>
  <div class="client-card" @click="router.push(`/client/${itemDetails.id}`)">
    <div class="client-card__user">
      <div class="client-card__header">
        <div class="client-card__icon">
          <img src="/icons/user.svg" alt="icon" />
          <div
            class="client-card__indicator"
            :class="[
              { inactive: itemDetails.status == 'Неактивен' },
              { suspended: itemDetails.status == 'Приостановлен' },
            ]"
            :title="`Клиент ${itemDetails.status}`"
          ></div>
        </div>
        <div class="client-card__info">
          <h3 class="client-card__name" v-if="itemDetails.fullname">
            {{ itemDetails.fullname }}
          </h3>
          <a
            v-if="itemDetails.phone"
            :href="`tel:+${new String(itemDetails.phone).replace(
              /(\d{3})(\d{3})(\d{4})/,
              '$1-$2-$3'
            )}`"
            class="client-card__number"
          >
            {{
              new String(itemDetails.phone).replace(
                /(\d{3})(\d{3})(\d{4})/,
                "$1-$2-$3"
              )
            }}
          </a>
        </div>
      </div>
      <div
        class="client-card__menu"
        @click.stop="$emit('delete', itemDetails.id)"
      >
        <img src="/icons/delete.svg" alt="icon" />
      </div>
    </div>
    <div class="client-card__details">
      <h3 class="client-card__location" v-if="itemDetails.region">
        {{ itemDetails.region }}
      </h3>
      <span title="Дата добавления" class="client-card__date">
        {{
          itemDetails.created_at.length == 10
            ? itemDetails.created_at
            : new Date(itemDetails.created_at).toLocaleDateString()
        }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  itemDetails: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.client-card {
  position: relative;
  transition: 0.3s ease-in;
  cursor: pointer;
  border-radius: 12px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #f0f3f4;
  color: #0d0c22;

  @media (max-width: 500px) {
    padding: 5px;
  }

  &__user {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 10px;

    @media (max-width: 500px) {
      gap: 6px;
    }
  }

  &__menu {
    height: 20px;
    width: 20px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    align-self: flex-start;

    img {
      width: 20px;
      height: 20px;
    }
  }

  &__dropdown {
    position: absolute;
    overflow: hidden;
    right: -10px;
    top: 24px;
    z-index: 99;
    background: #191742f3;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    &__item {
      padding: 10px;
      color: #f0f3f4;
      position: relative;
      cursor: pointer;
      transition: 0.3s ease-in;

      &:hover {
        background: #3d3881f3;
      }
    }
  }

  &__icon {
    position: relative;
    height: 40px;
    width: 40px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 500px) {
      height: 30px;
      width: 30px;
    }
  }

  &__name {
    font-weight: 700;
    font-size: 16px;
    color: #191742f3;

    @media (max-width: 500px) {
      font-size: 14px;
      font-weight: 500;
    }
  }

  &__number {
    font-weight: 400;
    font-size: 14px;

    @media (max-width: 500px) {
      font-size: 12px;
    }
  }

  &__details {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__location {
    font-weight: 500;
    font-size: 16px;

    @media (max-width: 500px) {
      font-size: 14px;
      font-weight: 400;
    }
  }

  &__date {
    font-size: 12px;
    font-weight: 500;

    @media (max-width: 500px) {
      font-size: 10px;
      font-weight: 400;
    }
  }

  &__indicator {
    position: absolute;
    right: 3px;
    bottom: 3px;
    background: yellowgreen;
    border-radius: 50%;
    height: 12px;
    width: 12px;

    @media (max-width: 500px) {
      height: 8px;
      width: 8px;
    }

    &.inactive {
      background: coral;
    }

    &.suspended {
      background: chartreuse;
    }
  }

  &::after {
    content: "";
    position: absolute;
    border-radius: 0 0 100px 100px;
    height: 10px;
    bottom: 0;
    transition: 0.5s ease;
    left: 0;
    width: 0;
    background: #191742f3;
  }

  &:hover {
    &::after {
      width: 100%;
    }
  }
}
</style>
