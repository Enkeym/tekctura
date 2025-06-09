export interface Slide {
  title: string
  description: string
  media: SlideMedia[]
}

export interface SlideMedia {
  src: string
  kind: "image" | "animation"
}
