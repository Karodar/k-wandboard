<script setup lang="ts">
import { ref } from '@vue/runtime-core';
import Scene from './components/Scene.vue';

const currentFps = ref(0);
const updateFps = (fps) => {
  currentFps.value = fps;
};
</script>

<template>
  <span class="fps">{{ currentFps }}</span>
  <h1>UnMonopoly</h1>

  <Scene @fps="updateFps($event)" />
</template>

<style scoped>
.fps {
  color: red;
  font-size: 2rem;
  font-weight: 600;
  text-shadow: 1px 1px 2px dodgerblue;
  position: absolute;
  top: 1rem;
  right: 1rem;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
