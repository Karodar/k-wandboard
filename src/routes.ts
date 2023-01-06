import Scene from "@/components/SceneDefault.vue";
import SceneSkybox from "@/components/SceneSkybox.vue";
import NotFound from "@/components/NotFound.vue";

export const routes = [
    {
        path: '/',
        name: 'index',
        component: Scene,
    },
    {
        path: '/skybox',
        name: 'skybox',
        component: SceneSkybox
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    },
]