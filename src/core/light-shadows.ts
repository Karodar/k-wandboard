import {
  AbstractMesh,
  Color3,
  Engine,
  FreeCamera,
  GizmoManager,
  GlowLayer,
  Light,
  LightGizmo,
  MeshBuilder,
  PointLight,
  Scene,
  SceneLoader, ShadowGenerator,
  SpotLight,
  Vector3,
} from '@babylonjs/core';
import '@babylonjs/loaders'

export class DefaultLightShadows {
  scene: Scene;
  engine: Engine;
  lightTubes!: AbstractMesh[];
  models!: AbstractMesh[];
  ball!: AbstractMesh;

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
    const camera = new FreeCamera('camera', new Vector3(0, 1, -4), this.scene);
    camera.attachControl();
    camera.speed = 0.2;

    return scene;
  }

  CreateEnvironment(): void {
    this.CreateLightRoom()
  }

  async CreateLightRoom(): Promise<void> {
    const { meshes } = await SceneLoader.ImportMeshAsync('', './models/', 'light-room.glb', this.scene);

    this.models = meshes
    this.lightTubes = meshes.filter((mesh) => mesh.name === 'lightTube_left' || mesh.name === 'lightTube_right')

    this.ball = MeshBuilder.CreateSphere('ball', {diameter: .5}, this.scene)
    this.ball.position = new Vector3(0, 1, -1);

    const glowLayer = new GlowLayer('glowLayer', this.scene)
    glowLayer.intensity = .75

    this.CreateLight()
  }

  CreateLight(): void {
    // const hemiLight = new HemisphericLight('hemiLight', new Vector3(0, 1, 0), this.scene)
    //
    // hemiLight.diffuse = new Color3(1,0,0)
    // hemiLight.groundColor = new Color3(0,0,1)
    // hemiLight.specular = new Color3(0,1,0)

    // const directionalLight = new DirectionalLight('directionalLight', new Vector3(0, -1, 0), this.scene)

    const pointLight = new PointLight('pointLight', new Vector3(0, 1, 0), this.scene)
    pointLight.diffuse = new Color3(172/255, 246/250, 250/255)
    pointLight.intensity = .25

    const pointCloneLight = pointLight.clone('pointCloneLight') as PointLight

    pointLight.parent = this.lightTubes[0]
    pointCloneLight.parent = this.lightTubes[1]

    const spotLight = new SpotLight('spotLight', new Vector3(0, .5, -3), new Vector3(0, 1, 3), Math.PI/2, 10, this.scene)
    spotLight.intensity = 100

    spotLight.shadowEnabled = true
    spotLight.shadowMinZ = 1
    spotLight.shadowMaxZ = 10

    const shadowGenerator = new ShadowGenerator(2048, spotLight)
    shadowGenerator.useBlurCloseExponentialShadowMap = true

    this.ball.receiveShadows = true
    shadowGenerator.addShadowCaster(this.ball)

    this.models.forEach(mesh => {
      mesh.receiveShadows = true
      shadowGenerator.addShadowCaster(mesh)
    })

    this.CreateGizmo(spotLight)
  }

  CreateGizmo(customLight: Light): void {
    const lightGizmo = new LightGizmo()
    lightGizmo.scaleRatio = 2
    lightGizmo.light = customLight

    const gizmoManager = new GizmoManager(this.scene)
    gizmoManager.positionGizmoEnabled = true
    gizmoManager.rotationGizmoEnabled = true
    gizmoManager.usePointerToAttachGizmos = false
    gizmoManager.attachToMesh(lightGizmo.attachedMesh)
  }
}
