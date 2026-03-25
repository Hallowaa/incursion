import type LoadedResources from './LoadedResources'
import type Incursion from '@/datatypes/business/incursion/Incursion'
import {
  AxesHelper,
  GridHelper,
  OrthographicCamera,
  Raycaster,
  Scene,
  TextureLoader,
  Vector2,
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
  public currentIncursion: Incursion | undefined

  private debugHelpersVisible = false
  private axesHelper = new AxesHelper(400)
  private gridHelper = new GridHelper(2000, 40, 0xFF0000, 0xFFFFFF)

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
    this.webGLRenderer.setClearColor(0xFFD861, 1)
    this.webGLRenderer.autoClear = false

    this.camera = new OrthographicCamera(
      (this.frustumSize * aspect) / -2,
      (this.frustumSize * aspect) / 2,
      this.frustumSize / 2,
      this.frustumSize / -2,
      0.1,
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

    this.camera.position.set(1000, 1000, 1000)
    this.camera.lookAt(0, 0, 0)

    this.controls = new OrbitControls(this.camera, canvas)
    this.controls.enableRotate = true
    this.controls.enableZoom = true
    this.controls.enablePan = true

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
        samples: 3
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
    const incursionSceneBuilder = new IncursionSceneBuilder(this, incursion)
    incursionSceneBuilder.buildScene()
    this.currentScene.add(incursionSceneBuilder.scene)
  }

  public startRendering() {
    this.webGLRenderer.setAnimationLoop(this.animate.bind(this))
  }

  public animate(time: number) {
    this.controls.update()
    this.webGLRenderer.clear()
    this.composer.render()
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

  public static getCSSVar(name: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(name)
  }
}
