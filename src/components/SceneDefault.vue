<script setup lang="ts">
import {onMounted, ref} from "vue";
import {DefaultScene} from "@/core/scene";
import LoadingDefault from "@/components/LoadingDefault.vue";

const canvasRef = ref<HTMLCanvasElement>();
const percentLoading = ref<number>(1);

onMounted(() => {
  new DefaultScene(canvasRef.value as HTMLCanvasElement);
  percentLoading.value = 100
});
</script>

<template>
  <LoadingDefault :percent="percentLoading" :tween-boost="1" />
  <canvas ref="canvasRef" class="scene" />
</template>
