import {
  Engine,
  FreeCamera,
  HemisphericLight,
  ISceneLoaderProgressEvent,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Vector3,
} from "@babylonjs/core";

export class DefaultScene {
  scene: Scene;
  engine: Engine;

  constructor(
    private canvas: HTMLCanvasElement,
    private onProgress: (event: ISceneLoaderProgressEvent) => void
  ) {
    this.engine = new Engine(this.canvas, true);
    this.scene = this.CreateScene();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.25;

    const hemiLight = new HemisphericLight(
      "hemiLight",
      new Vector3(0, 1, 0),
      this.scene
    );
    hemiLight.intensity = 1;

    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10 },
      this.scene
    );
    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, this.scene);
    ball.position = new Vector3(0, 1, 0);

    ground.material = this.CreateGroundMaterial();
    ball.material = this.CreateBallMaterial();

    return scene;
  }

  CreateGroundMaterial(): StandardMaterial {
    const material = new StandardMaterial("groundMaterial", this.scene);
    const uvScale = 4;
    const texList: Texture[] = [];

    const diffuse = new Texture(
      "./textures/ground/ground-diffuse.jpg",
      this.scene
    );
    material.diffuseTexture = diffuse;
    texList.push(diffuse);

    const normal = new Texture(
      "./textures/ground/ground-normal.jpg",
      this.scene
    );
    material.bumpTexture = normal;
    texList.push(normal);

    const ao = new Texture("./textures/ground/ground-ao.jpg", this.scene);
    material.ambientTexture = ao;
    texList.push(ao);

    const spec = new Texture("./textures/ground/ground-spec.jpg", this.scene);
    material.specularTexture = spec;
    texList.push(spec);

    texList.forEach((texture) => {
      texture.uScale = uvScale;
      texture.vScale = uvScale;
    });

    return material;
  }

  CreateBallMaterial(): StandardMaterial {
    const material = new StandardMaterial("ballMaterial", this.scene);
    const uvScale = 2;
    const texList: Texture[] = [];

    const diffuse = new Texture(
      "./textures/brick/brick-diffuse.jpg",
      this.scene
    );
    material.diffuseTexture = diffuse;
    texList.push(diffuse);

    const normal = new Texture("./textures/brick/brick-normal.jpg", this.scene);
    material.bumpTexture = normal;
    // material.invertNormalMapX = true
    // material.invertNormalMapY = true
    texList.push(normal);

    const ao = new Texture("./textures/brick/brick-ao.jpg", this.scene);
    material.ambientTexture = ao;
    texList.push(ao);

    const spec = new Texture("./textures/brick/brick-spec.jpg", this.scene);
    material.specularTexture = spec;
    material.specularPower = 40;
    texList.push(spec);

    texList.forEach((texture) => {
      texture.uScale = uvScale;
      texture.vScale = uvScale;
    });

    return material;
  }
}
