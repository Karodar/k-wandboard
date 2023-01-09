import {
  CubeTexture,
  Engine,
  FreeCamera,
  ISceneLoaderProgressEvent,
  PBRMaterial,
  Scene,
  SceneLoader,
  Texture,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/loaders";

export class DefaultModels {
  scene: Scene;
  engine: Engine;

  constructor(
    private canvas: HTMLCanvasElement,
    private onProgress: (event: ISceneLoaderProgressEvent) => void
  ) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();

    this.CreateEnvironment();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.25;

    const envTexture = CubeTexture.CreateFromPrefilteredData(
      "./environment/sky.env",
      scene
    );
    scene.environmentTexture = envTexture;
    scene.createDefaultSkybox(envTexture, true);
    scene.environmentIntensity = 0.8;

    return scene;
  }

  CreateEnvironment(): void {
    // const ground = MeshBuilder.CreateGround(
    //     'ground',
    //     { width: 10, height: 10 },
    //     this.scene
    // );
    //
    // ground.material = this.CreateGround();
    this.CreateBarrel();
    this.CreateCampfire();
  }

  CreateGround(): PBRMaterial {
    const pbr = new PBRMaterial("pbr", this.scene);

    pbr.albedoTexture = new Texture(
      "./textures/rock/rock-diffuse.jpg",
      this.scene
    );
    pbr.bumpTexture = new Texture(
      "./textures/rock/rock-normal.jpg",
      this.scene
    );

    pbr.useAmbientOcclusionFromMetallicTextureRed = true;
    pbr.useRoughnessFromMetallicTextureGreen = true;
    pbr.useMetallnessFromMetallicTextureBlue = true;

    pbr.metallicTexture = new Texture(
      "./textures/rock/rock-ao-rogh-metal.jpg",
      this.scene
    );

    pbr.roughness = 1;

    return pbr;
  }

  async CreateBarrel(): Promise<void> {
    const models = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "wine-barrel.glb",
      this.scene,
      this.onProgress
    );

    // Moved barrel to a new position (stone)
    models.meshes[0].position = new Vector3(-4.4, 0.68, -2.8);

    console.log("MODEL_BARREL::", models);
  }

  async CreateCampfire(): Promise<void> {
    const models = await SceneLoader.ImportMeshAsync(
      "",
      "./models/",
      "campfire.glb",
      this.scene
    );

    console.log("MODEL_CAMPFIRE::", models);
  }
}
