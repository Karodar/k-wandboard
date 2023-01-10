<script setup lang="ts">
import {onMounted, ref} from "vue";
import {DefaultModels} from "@/core/models";
import {ISceneLoaderProgressEvent} from "@babylonjs/core";
import LoadingDefault from '@/components/LoadingDefault.vue'

const canvasRef = ref<HTMLCanvasElement>();
const percentLoading = ref<number>(1);
const speedTween = ref<number>()

const onProgress = ({ loaded, total }: ISceneLoaderProgressEvent) => {
  const currentPercent = Number(((loaded * 100) / total).toFixed())

  if (currentPercent > 50) {
    speedTween.value = 1800
    percentLoading.value = 100
  }

  percentLoading.value = currentPercent;
};

onMounted(() => {
  new DefaultModels(canvasRef.value as HTMLCanvasElement, onProgress);
});
</script>

<template>
  <LoadingDefault :percent="percentLoading" :speed="speedTween" />
  <canvas ref="canvasRef" class="scene" />
</template>
