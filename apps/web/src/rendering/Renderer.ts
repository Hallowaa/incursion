import type Tile from './game-objects/Tile'
import type CharacterController from './input/CharacterController'
import type InputEventContext from './input/InputEventContext'

import type LoadedResources from './LoadedResources'
import type Incursion from '@/datatypes/business/incursion/Incursion'
import {
  AxesHelper,
  GridHelper,
  HalfFloatType,
  OrthographicCamera,
  Plane,
  Raycaster,
  Scene,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer,
  WebGLRenderTarget
} from 'three'
import { ClearPass, EffectComposer, OrbitControls, OutputPass, RenderPass } from 'three/examples/jsm/Addons.js'
import NotificationManager from '@/managers/NotificationManager'
import IncursionSceneBuilder from './scene-builders/IncursionSceneBuilder'

export default class Renderer {
  public static resources: LoadedResources = {}
  public webGLRenderer!: WebGLRenderer
  public composer!: EffectComposer
  public camera!: OrthographicCamera
  public cameraGui!: OrthographicCamera
  public loaded = false
  public pointer = new Vector2(0, 0)
  public unprojPointer = new Vector2(0, 0)

  private raycaster = new Raycaster()
  private frustumSize = 2000

  public currentScene = new Scene()
  public currentGuiScene = new Scene()

  private isPointerDown = false
  private currentButton: number | undefined

  public controls!: OrbitControls

  // SET TO TRUE FOR DEBUGGING
  private controlsEnabled = false

  public currentIncursion: Incursion | undefined

  private debugHelpersVisible = false
  private axesHelper = new AxesHelper(300)
  private gridHelper = new GridHelper(3000, 20, 0xFF0000, 0xFFFFFF)

  private incursionSceneBuilder: IncursionSceneBuilder | undefined
  public characterController: CharacterController | undefined

  public async load() {
    const imageLoader = new TextureLoader()
    try {
      imageLoader.load('src/assets/images/game/missing.png', (image) => {
        Renderer.resources.missing = image
      })
    } catch (error) {
      NotificationManager.error('Failed to load resources')
      return
    }

    this.loaded = true
  }

  public init(canvas: HTMLCanvasElement) {
    const container = canvas.parentElement!
    const width = container.clientWidth
    const height = container.clientHeight
    const aspect = width / height

    this.webGLRenderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    })

    this.webGLRenderer.setSize(width, height)
    this.webGLRenderer.setPixelRatio(window.devicePixelRatio)
    this.webGLRenderer.setClearColor('#010102', 1)
    this.webGLRenderer.autoClear = false

    this.camera = new OrthographicCamera(
      (this.frustumSize * aspect) / -2,
      (this.frustumSize * aspect) / 2,
      this.frustumSize / 2,
      this.frustumSize / -2,
      0.01,
      20000
    )

    this.cameraGui = new OrthographicCamera(
      (this.frustumSize * aspect) / -2,
      (this.frustumSize * aspect) / 2,
      this.frustumSize / 2,
      this.frustumSize / -2,
      0.1,
      500
    )

    this.camera.position.set(2000, 2000, 2000)
    this.camera.lookAt(0, 0, 0)

    this.controls = new OrbitControls(this.camera, canvas)
    this.controls.enableRotate = true
    this.controls.enableZoom = true
    this.controls.enablePan = true

    this.controls.enabled = this.controlsEnabled

    this.raycaster.layers.set(0)
    this.raycaster.setFromCamera(this.pointer, this.cameraGui)

    this.setupComposer()

    new ResizeObserver(() => {
      const w = container.clientWidth
      const h = container.clientHeight
      const aspect = w / h

      this.camera.left = (-this.frustumSize * aspect) / 2
      this.camera.right = (this.frustumSize * aspect) / 2
      this.camera.top = this.frustumSize / 2
      this.camera.bottom = -this.frustumSize / 2

      this.cameraGui.left = (-this.frustumSize * aspect) / 2
      this.cameraGui.right = (this.frustumSize * aspect) / 2
      this.cameraGui.top = this.frustumSize / 2
      this.cameraGui.bottom = -this.frustumSize / 2

      this.camera.updateProjectionMatrix()
      this.cameraGui.updateProjectionMatrix()

      this.webGLRenderer.setSize(w, h)
      this.composer.setSize(w, h)
    }).observe(container)

    this.handleEvents()
  }

  private handleEvents() {
    this.webGLRenderer.domElement.addEventListener('pointermove', (event: PointerEvent) => this.onPointerMove(event))
    this.webGLRenderer.domElement.addEventListener('pointerdown', (event: PointerEvent) => this.onPointerDown(event))
  }

  private setupComposer() {
    const clearPass = new ClearPass()

    const sceneRender = new RenderPass(this.currentScene, this.camera)
    sceneRender.clear = false
    sceneRender.clearDepth = true

    const guiRender = new RenderPass(this.currentGuiScene, this.cameraGui)
    guiRender.clear = false
    guiRender.clearDepth = true

    const outputPass = new OutputPass()
    outputPass.renderToScreen = true

    const canvas = this.webGLRenderer.domElement
    const container = canvas.parentElement!
    const renderTarget = new WebGLRenderTarget(
      container.clientWidth,
      container.clientHeight,
      {
        samples: 3,
        type: HalfFloatType
      }
    )

    this.composer = new EffectComposer(this.webGLRenderer, renderTarget)
    this.composer.setSize(container.clientWidth, container.clientHeight)
    this.composer.setPixelRatio(window.devicePixelRatio)

    this.composer.addPass(clearPass)
    this.composer.addPass(sceneRender)
    this.composer.addPass(guiRender)
    this.composer.addPass(outputPass)

    this.composer.render()
  }

  public buildIncursionScene(incursion: Incursion) {
    this.incursionSceneBuilder = new IncursionSceneBuilder(this, incursion)
    this.incursionSceneBuilder.buildScene()
    this.currentScene.add(this.incursionSceneBuilder.scene)

    if (!this.characterController) {
      NotificationManager.error(`Failed to initialize character controller`)
      return
    }

    this.characterController.grid = this.incursionSceneBuilder.grid
  }

  public onPointerMove(event: PointerEvent) {
    if (!this.incursionSceneBuilder) {
      return
    }

    const rect = this.webGLRenderer.domElement.getBoundingClientRect()

    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    const ctx: InputEventContext = {
      tile: this.computeTargetTile()
    }

    if (!this.characterController) {
      NotificationManager.error(`Failed to initialize character controller`)
      return
    }

    this.characterController.onPointerMove(ctx)
  }

  public onPointerDown(event: PointerEvent) {
    if (!this.incursionSceneBuilder) {
      return
    }

    const ctx: InputEventContext = {
      button: event.button, // 0 = left, 2 = right
      tile: this.computeTargetTile()
    }

    if (!this.characterController) {
      NotificationManager.error(`Failed to initialize character controller`)
      return
    }

    this.characterController.onPointerDown(ctx)
  }

  public startRendering() {
    this.webGLRenderer.setAnimationLoop(this.animate.bind(this))
  }

  public animate(time: number) {
    this.controls.update()
    this.webGLRenderer.clear()
    this.composer.render()
    this.incursionSceneBuilder?.animateScene(time)
  }

  public toggleDebugHelpers() {
    this.debugHelpersVisible = !this.debugHelpersVisible

    if (this.debugHelpersVisible) {
      this.currentScene.add(this.axesHelper)
      this.currentScene.add(this.gridHelper)
    } else {
      this.currentScene.remove(this.axesHelper)
      this.currentScene.remove(this.gridHelper)
    }
  }

  private readonly gridPlane = new Plane(new Vector3(0, 1, 0), -3)

  private computeTargetTile(): Tile | undefined {
    if (!this.incursionSceneBuilder) return

    this.raycaster.setFromCamera(this.pointer, this.camera)

    const target = new Vector3()
    if (!this.raycaster.ray.intersectPlane(this.gridPlane, target)) return

    const tile = this.incursionSceneBuilder.grid.tileAtWorldPos(target)

    return tile
  }

  public static getCSSVar(name: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(name)
  }
}
