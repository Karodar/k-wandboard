<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {DefaultModels} from "@/core/models";

const canvasRef = ref(document.createElement('canvas'));

onMounted(() => {
  new DefaultModels(canvasRef.value)
});
</script>

<template>
  <canvas ref="canvasRef" class="scene" />
</template>
