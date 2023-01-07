<script setup lang="ts">
import HeaderDefault from "@/components/HeaderDefault.vue";
</script>

<template>
  <HeaderDefault class="navbar" />
  <router-view></router-view>
</template>

<style lang="scss" scoped>
.navbar {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
