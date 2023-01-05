<script setup lang="ts">
import { ref, onMounted } from '@vue/runtime-core';
import { DefaultScene } from '../core/scene'

const canvasRef = ref(null);

onMounted(() => {
  new DefaultScene(canvasRef.value)
});
</script>

<template>
  <canvas ref="canvasRef" class="scene" />
</template>

<style scoped>
.scene {
  width: 86vw;
  height: 80vh;
}
</style>
