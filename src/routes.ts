import Scene from "@/components/SceneDefault.vue";
import SceneSkybox from "@/components/SceneSkybox.vue";
import NotFound from "@/components/NotFound.vue";
import SceneModels from "@/components/SceneModels.vue";
import SceneLightRoom from "@/components/SceneLightRoom.vue";

export const routes = [
  {
    path: "/",
    name: "index",
    component: Scene,
  },
  {
    path: "/skybox",
    name: "skybox",
    component: SceneSkybox,
  },
  {
    path: "/models",
    name: "models",
    component: SceneModels,
  },
  {
    path: "/shadows",
    name: "shadows",
    component: SceneLightRoom,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFound,
  },
];
