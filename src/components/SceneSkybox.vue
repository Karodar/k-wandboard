<script setup lang="ts">
import { onMounted, ref } from "vue";
import { DefaultPBR } from "@/core/pbr";
import LoadingDefault from "@/components/LoadingDefault.vue";

const canvasRef = ref<HTMLCanvasElement>();
const percentLoading = ref<number>(1);
const speedTween = ref<number>()

onMounted(() => {
  new DefaultPBR(canvasRef.value as HTMLCanvasElement);
  speedTween.value = 700
  percentLoading.value = 100
});
</script>

<template>
  <LoadingDefault :percent="percentLoading" :speed="speedTween" />
  <canvas ref="canvasRef" class="scene" />
</template>
