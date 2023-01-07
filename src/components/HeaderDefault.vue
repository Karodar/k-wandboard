<script setup lang="ts">
import Logo from '@/assets/vue.svg?component'
import Babylon from '@/assets/babylon.svg?component'
import Plus from '@/assets/plus.svg?component'
import ButtonDefault from "@/components/ButtonDefault.vue";
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <div class="header">
    <div class="header__section">
      <Logo />
      <Plus />
      <Babylon />
    </div>
    <div class="header__section">
      <ButtonDefault @click="router.push({ name: 'index' })">Текстуры</ButtonDefault>
      <ButtonDefault @click="router.push({ name: 'skybox' })">Skybox + Свечение</ButtonDefault>
      <ButtonDefault @click="router.push({ name: 'models' })">Модели</ButtonDefault>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  gap: .8rem;

  svg {
    width: 4rem;
    height: 4rem;

    &:nth-child(2) {
      width: 2rem;
      height: 2rem;
    }
  }

  &__section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}
</style>