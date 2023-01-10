<script setup lang="ts">
import {onMounted, ref} from "vue";
import {DefaultPBR} from "@/core/pbr";
import LoadingDefault from "@/components/LoadingDefault.vue";

const canvasRef = ref<HTMLCanvasElement>();
const percentLoading = ref<number>(1);

onMounted(() => {
  new DefaultPBR(canvasRef.value as HTMLCanvasElement);
  percentLoading.value = 100
});
</script>

<template>
  <LoadingDefault :percent="percentLoading" :tween-boost="2" />
  <canvas ref="canvasRef" class="scene" />
</template>
