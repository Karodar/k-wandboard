<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { DefaultScene } from '@/core/scene'

const canvasRef = ref(document.createElement('canvas'));

onMounted(() => {
  new DefaultScene(canvasRef.value)
});
</script>

<template>
  <canvas ref="canvasRef" class="scene" />
</template>
