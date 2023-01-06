import {
  Color3,
  CubeTexture,
  Engine,
  FreeCamera, GlowLayer,
  HemisphericLight,
  MeshBuilder,
  PBRMaterial,
  Scene,
  Texture,
  Vector3,
} from '@babylonjs/core';

export class DefaultPBR {
  scene: Scene;
  engine: Engine;

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new Engine(canvas, true);
    this.scene = this.CreateScene();

    this.CreateEnvironment()

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine);
    const camera = new FreeCamera('camera', new Vector3(0, 1, -5), this.scene);
    camera.attachControl();
    camera.speed = 0.25;

    const hemiLight = new HemisphericLight(
      'hemiLight',
      new Vector3(0, 1, 0),
      this.scene
    );
    hemiLight.intensity = 0;

    const envTexture = CubeTexture.CreateFromPrefilteredData('./environment/snow-xmas.env', scene)
    scene.environmentTexture = envTexture
    scene.createDefaultSkybox(envTexture, true);

    return scene;
  }

  CreateEnvironment(): void {
    const ground = MeshBuilder.CreateGround(
        'ground',
        { width: 10, height: 10 },
        this.scene
    );
    const box = MeshBuilder.CreateBox('box', { width: 2, height: 1.4 }, this.scene);
    box.position = new Vector3(0, 1, 0);

    ground.material = this.CreateSnow();
    box.material = this.CreateSciFiMonitor();
  }

  CreateSnow(): PBRMaterial {
    const pbr = new PBRMaterial('pbr', this.scene)

    pbr.albedoTexture = new Texture('./textures/snow/snow-diffuse.jpg', this.scene);
    pbr.bumpTexture = new Texture('./textures/snow/snow-normal.jpg', this.scene);

    // pbr.invertNormalMapX = true;
    // pbr.invertNormalMapY = true;

    pbr.useAmbientOcclusionFromMetallicTextureRed = true
    pbr.useRoughnessFromMetallicTextureGreen = true
    pbr.useMetallnessFromMetallicTextureBlue = true

    pbr.metallicTexture = new Texture('./textures/snow/snow-ao-rogh-metal.jpg', this.scene);

    pbr.environmentIntensity = 4

    return pbr
  }

  CreateSciFiMonitor(): PBRMaterial {
    const pbr = new PBRMaterial('pbr', this.scene)

    pbr.albedoTexture = new Texture('./textures/sci-fi/sci-fi-basecolor.png', this.scene);
    pbr.bumpTexture = new Texture('./textures/sci-fi/sci-fi-normal.png', this.scene);
    // pbr.roughness = 1

    pbr.invertNormalMapX = true;
    pbr.invertNormalMapY = true;

    pbr.useAmbientOcclusionFromMetallicTextureRed = true
    pbr.useRoughnessFromMetallicTextureGreen = true
    pbr.useMetallnessFromMetallicTextureBlue = true

    pbr.metallicTexture = new Texture('./textures/sci-fi/sci-fi-ao-rogh-metal.png', this.scene);

    pbr.emissiveColor = new Color3(1,1,1)
    pbr.emissiveTexture = new Texture('./textures/sci-fi/sci-fi-emissive.png', this.scene);
    pbr.emissiveIntensity = 10

    const glowLayer = new GlowLayer('glow', this.scene)
    glowLayer.intensity = .2

    pbr.roughness = 1

    return pbr
  }
}
