<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {DefaultPBR} from "@/core/pbr";

const canvasRef = ref(document.createElement('canvas'));

onMounted(() => {
  new DefaultPBR(canvasRef.value)
});
</script>

<template>
  <canvas ref="canvasRef" class="scene" />
</template>
