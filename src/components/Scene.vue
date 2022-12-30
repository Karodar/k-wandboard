<script setup lang="ts">
import { ref, onMounted } from '@vue/runtime-core';
import { createScene } from '../core/scene';

const emit = defineEmits<{
  (e: 'fps', value: number): void;
}>();

const bjsCanvas = ref(null);
const fpsCallback = (fps) => {
  emit('fps', fps);
};

onMounted(() => {
  if (bjsCanvas.value) {
    createScene(bjsCanvas.value, fpsCallback);
  }
});
</script>

<template>
  <canvas ref="bjsCanvas" class="scene" />
</template>

<style scoped>
.scene {
  width: 86vw;
  height: 80vh;
}
</style>
