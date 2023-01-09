<script setup lang="ts">
import {onMounted, ref} from "vue";
import {DefaultLightShadows} from "@/core/light-shadows";
import LoadingDefault from "@/components/LoadingDefault.vue";
import {ISceneLoaderProgressEvent} from "@babylonjs/core";

const canvasRef = ref<HTMLCanvasElement>();
const percentLoading = ref<number>(0);

const onProgress = ({ loaded, total }: ISceneLoaderProgressEvent) => {
  percentLoading.value = Number(((loaded * 100) / total).toFixed());
};

onMounted(() => {
  new DefaultLightShadows(canvasRef.value as HTMLCanvasElement, onProgress);
});
</script>

<template>
  <LoadingDefault :percent="percentLoading" />
  <canvas ref="canvasRef" class="scene" />
</template>
