import { createApp } from 'vue'
import '@/app.scss'
import App from '@/App.vue'
import {createRouter, createWebHistory} from "vue-router";
import {routes} from "@/routes";

const router = createRouter({ history: createWebHistory(), routes })

createApp(App)
    .use(router)
    .mount('#app')
