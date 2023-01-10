<script setup lang="ts">
import {onMounted, ref} from "vue";
import {DefaultLightShadows} from "@/core/light-shadows";
import LoadingDefault from "@/components/LoadingDefault.vue";
import {ISceneLoaderProgressEvent} from "@babylonjs/core";

const canvasRef = ref<HTMLCanvasElement>();
const percentLoading = ref<number>(1);
const speedTween = ref<number>()

const onProgress = ({ loaded, total }: ISceneLoaderProgressEvent) => {
  if (Number(loaded) === 0 || Number(total) === 0) {
    return
  }
  const currentPercent = Number(((loaded * 100) / total).toFixed())

  if (currentPercent > 90) {
    speedTween.value = 1800
    percentLoading.value = 100
  }

  percentLoading.value = currentPercent;
};

onMounted(() => {
  new DefaultLightShadows(canvasRef.value as HTMLCanvasElement, onProgress);
});
</script>

<template>
  <LoadingDefault :percent="percentLoading" :speed="speedTween" />
  <canvas ref="canvasRef" class="scene" />
</template>
