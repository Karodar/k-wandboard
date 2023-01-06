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
  top: 2rem;
  left: 2rem;
}
</style>
