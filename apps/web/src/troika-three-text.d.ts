declare module 'troika-three-text' {
  import { Mesh } from 'three'

  export class Text extends Mesh {
    text: string
    fontSize: number
    color: number | string
    anchorX: 'left' | 'center' | 'right' | number
    anchorY: 'top' | 'top-baseline' | 'middle' | 'bottom-baseline' | 'bottom' | number
    maxWidth: number
    textAlign: 'left' | 'right' | 'center' | 'justify'
    font: string | null
    sync(callback?: () => void): void
  }
}
