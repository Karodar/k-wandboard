<script setup lang="ts">
import {computed, defineProps, ref, watch, withDefaults} from "vue";
import gsap from "gsap";

const props = withDefaults(
  defineProps<{
    percent: number;
    speed: number
  }>(),
  { percent: 0, speed: 500 }
);
const tweneedPercent = ref(0);

watch(
  () => props.percent,
  (value) => {
    console.log('WATCH::', value)
    gsap.to(tweneedPercent, { duration: props.speed / 1000, value });
  },
  {
    immediate: true,
  }
);

const isCompleted = computed(
  () => tweneedPercent.value === 100
);
</script>

<template>
  <Teleport to="#app">
    <Transition name="fade">
      <div v-if="!isCompleted" class="loading">
        <div class="loading__shape">
          <div class="loading__loader">
            <span class="loading__percent"
              >{{ tweneedPercent.toFixed() }}%</span
            >
          </div>
        </div>
        <div class="loading__backdrop"></div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.loading {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__shape {
    position: relative;
    display: flex;
    width: 24rem;
    height: 24rem;
    border-radius: 100%;
    background: linear-gradient(
      165deg,
      rgba(255, 255, 255, 1) 0%,
      rgb(220, 220, 220) 40%,
      rgb(170, 170, 170) 98%,
      rgb(10, 10, 10) 100%
    );
    z-index: 10;

    @media (max-width: 456px) {
      width: 16rem;
      height: 16rem;
    }
  }

  &__backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(#cecece, #fff);
  }

  &__loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      border-radius: 100%;
      border-bottom: 0 solid #ffffff05;

      box-shadow: 0 -10px 20px 20px #ffffff40 inset,
        0 -5px 15px 10px #ffffff50 inset, 0 -2px 5px #ffffff80 inset,
        0 -3px 2px #ffffffbb inset, 0 2px 0px #ffffff, 0 2px 3px #ffffff,
        0 5px 5px #ffffff90, 0 10px 15px #ffffff60, 0 10px 20px 20px #ffffff40;
      filter: blur(3px);
      animation: 2s rotate linear infinite;
    }
  }

  &__percent {
    position: relative;
    left: 0.6rem;
    font-size: 5rem;
    font-weight: 300;
    color: #ffffff;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
