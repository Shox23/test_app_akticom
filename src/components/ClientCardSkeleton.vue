<template>
  <div class="skeleton-card">
    <div class="skeleton-card__head">
      <div class="skeleton-card__icon"></div>
      <div class="skeleton-card__details">
        <div class="skeleton-card__name"></div>
        <div class="skeleton-card__surname"></div>
      </div>
    </div>

    <div class="skeleton-card__foot">
      <div class="skeleton-card__region"></div>
      <div class="skeleton-card__indicator"></div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.skeleton-card {
  overflow: hidden;
  position: relative;
  height: 90px;
  width: 100%;
  border-radius: 12px;
  padding: 10px;
  background: #f0f3f4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 400px) {
    padding: 6px;
  }

  &__icon {
    background: #b3b1b3;
    border-radius: 50%;
    height: 40px;
    width: 40px;

    @media (max-width: 600px) {
      height: 30px;
      width: 30px;
    }
  }

  &__head {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  &__name {
    border-radius: 3px;
    background: #b3b1b3;
    height: 18px;
    width: 180px;

    @media (max-width: 600px) {
      width: 120px;
    }
  }

  &__surname {
    border-radius: 3px;
    background: #b3b1b3;
    height: 15px;
    width: 95px;
  }

  &__foot {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__region {
    border-radius: 3px;
    background: #b3b1b3;
    height: 15px;
    width: 100px;
  }

  &__indicator {
    background: #b3b1b3;
    border-radius: 50%;
    height: 16px;
    width: 16px;
  }

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.5) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 5s infinite;
    content: "";
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
