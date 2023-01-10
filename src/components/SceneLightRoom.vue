<script setup lang="ts">
import {computed, onMounted, reactive, ref} from "vue";
import {DefaultLightShadows} from "@/core/light-shadows";
import LoadingDefault from "@/components/LoadingDefault.vue";
import {ISceneLoaderProgressEvent} from "@babylonjs/core";

const canvasRef = ref<HTMLCanvasElement>();
const progress = reactive({ loaded: 0, total: 1, sceneReady: false })

const percent = computed(() => Number(((progress.loaded * 100) / progress.total).toFixed()))

const onProgress = ({ loaded, total }: ISceneLoaderProgressEvent) => {
  progress.loaded = loaded
  progress.total = total
};

onMounted(() => {
  new DefaultLightShadows(canvasRef.value as HTMLCanvasElement, onProgress);
});
</script>

<template>
  <LoadingDefault :percent="percent" :tween-boost="6"/>
  <canvas ref="canvasRef" class="scene" />
</template>
