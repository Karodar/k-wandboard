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
      <a href="https://v3.ru.vuejs.org/ru/" target="_blank"><Logo /></a>
      <Plus />
      <a href="https://www.babylonjs.com/" target="_blank"><Babylon /></a>
    </div>
    <div class="header__section">
      <ButtonDefault @click="router.push({ name: 'index' })">Текстуры</ButtonDefault>
      <ButtonDefault @click="router.push({ name: 'skybox' })">Skybox + Свечение</ButtonDefault>
      <ButtonDefault @click="router.push({ name: 'models' })">Модели</ButtonDefault>
      <ButtonDefault @click="router.push({ name: 'shadows' })">Свет + тени</ButtonDefault>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: .8rem;

  button {
    width: fit-content;
  }

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
    flex-wrap: wrap;

    @media (max-width: 456px) {
      &:first-child {
        gap: .4rem;
      }

      svg {
        width: 2.8rem;
        height: 2.8rem;

        &:nth-child(2) {
          width: 1.4rem;
          height: 1.4rem;
        }
      }
    }
  }
}
</style>