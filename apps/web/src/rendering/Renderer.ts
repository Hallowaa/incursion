import type LoadedResources from './LoadedResources'
import type Incursion from '@/datatypes/business/incursion/Incursion'
import {
  OrthographicCamera,
  Raycaster,
  Scene,
  TextureLoader,
  Vector2,
  WebGLRenderer,
  WebGLRenderTarget

} from 'three'

import { ClearPass, EffectComposer, OutputPass, RenderPass } from 'three/examples/jsm/Addons.js'
import NotificationManager from '@/managers/NotificationManager'

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

  public currentIncursion: Incursion | undefined

  public constructor(private readonly canvas: HTMLCanvasElement) {
    this.init(canvas)
  }

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
    const aspect = window.innerWidth / window.innerHeight

    this.webGLRenderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    })

    this.webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    this.webGLRenderer.setPixelRatio(window.devicePixelRatio)
    this.webGLRenderer.setClearColor(0x010101, 1)
    this.webGLRenderer.autoClear = false

    this.camera = new OrthographicCamera(
      (this.frustumSize * aspect) / -2,
      (this.frustumSize * aspect) / 2,
      this.frustumSize / 2,
      this.frustumSize / -2,
      0.1,
      2000
    )

    this.cameraGui = new OrthographicCamera(
      (this.frustumSize * aspect) / -2,
      (this.frustumSize * aspect) / 2,
      this.frustumSize / 2,
      this.frustumSize / -2,
      0.1,
      200
    )

    this.raycaster.layers.set(0)
    this.raycaster.setFromCamera(this.pointer, this.cameraGui)

    this.setupComposer()

    window.onresize = () => {
      const aspect = window.innerWidth / window.innerHeight

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

      this.webGLRenderer.setSize(window.innerWidth, window.innerHeight)
    }
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

    const renderTarget = new WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      {
        samples: 3
      }
    )

    this.composer = new EffectComposer(this.webGLRenderer, renderTarget)
    this.composer.setSize(window.innerWidth, window.innerHeight)
    this.composer.setPixelRatio(window.devicePixelRatio)

    this.composer.addPass(clearPass)
    this.composer.addPass(sceneRender)
    this.composer.addPass(guiRender)
    this.composer.addPass(outputPass)

    this.composer.render()
  }

  public startRendering() {
    this.webGLRenderer.setAnimationLoop(this.animate.bind(this))
  }

  public animate(time: number) {
    this.webGLRenderer.clear()
    this.composer.render()
  }

  public static getCSSVar(name: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(name)
  }
}
