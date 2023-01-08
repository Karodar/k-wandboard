<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {DefaultLightShadows} from "@/core/light-shadows";

const canvasRef = ref(document.createElement('canvas'));

onMounted(() => {
  new DefaultLightShadows(canvasRef.value)
});
</script>

<template>
  <canvas ref="canvasRef" class="scene" />
</template>
