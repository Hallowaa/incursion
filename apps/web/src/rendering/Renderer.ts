import type { LoadedResources, Incursion } from '@/barrel'
import {
  OrthographicCamera,
  Raycaster,
  TextureLoader,
  Vector2,
  WebGLRenderer,
  WebGLRenderTarget
} from 'three'
import { EffectComposer } from 'three/examples/jsm/Addons.js'
import { NotificationManager } from '@/barrel'

export default class Renderer {
  public static resources: LoadedResources = {}
  public webGLRenderer!: WebGLRenderer
  public composer!: EffectComposer
  public camera!: OrthographicCamera
  public loaded = false
  public pointer = new Vector2(0, 0)
  public unprojPointer = new Vector2(0, 0)

  private raycaster = new Raycaster()
  private frustumSize = 2000
  private frameRate = 60
  private lastFrame = 0
  private now = 0
  private fpsInterval = 1000 / this.frameRate
  private fpsTolerance = 0.1
  private start = 0
  private frameCount = 0
  private renderRequested = true

  private isPointerDown = false
  private currentButton: number | undefined

  public currentIncursion: Incursion | undefined

  public constructor(private readonly canvas: HTMLCanvasElement) {
    this.init(canvas)
  }

  public init(canvas: HTMLCanvasElement) {
    const aspect = window.innerWidth / window.innerHeight

    this.webGLRenderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    })

    this.webGLRenderer.setPixelRatio(window.devicePixelRatio)

    const renderTarget = new WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      {
        samples: 3
      }
    )

    this.composer = new EffectComposer(this.webGLRenderer, renderTarget)

    this.camera = new OrthographicCamera(
      (this.frustumSize * aspect) / -2,
      (this.frustumSize * aspect) / 2,
      this.frustumSize / 2,
      this.frustumSize / -2,
      0.1,
      20000
    )
    this.camera.translateZ(10000)

    this.camera.layers.enableAll()
    this.raycaster.layers.set(0)
    this.raycaster.setFromCamera(this.pointer, this.camera)
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

  public startRendering() {
    this.lastFrame = performance.now()
    this.start = this.lastFrame
    this.render(this.start)
  }

  public render(timestamp: number) {
    requestAnimationFrame((t) => this.render(t))

    this.now = timestamp
    const elapsed = this.now - this.lastFrame

    let skippedRender = false
    if (this.currentIncursion !== undefined) {
      // call obj.onframe here
    }

    if (
      elapsed > this.fpsInterval - this.fpsTolerance &&
      this.loaded === true &&
      this.currentIncursion !== undefined &&
      this.renderRequested === true
    ) {
      this.lastFrame = this.now - (elapsed % this.fpsInterval)
      this.composer.render()
      this.frameCount++

      this.renderRequested = false
    } else {
      skippedRender = true
    }

    if (
      elapsed > this.fpsInterval - this.fpsTolerance &&
      this.loaded === true &&
      this.currentIncursion !== undefined &&
      skippedRender === true
    ) {
      this.lastFrame = this.now - (elapsed % this.fpsInterval)
      this.composer.render()
      this.frameCount++
    }
  }

  public requestRender() {
    this.renderRequested = true
  }

  public static getCSSVar(name: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(name)
  }
}
