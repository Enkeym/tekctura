export interface Slide {
  title: string
  category: "All" | "LES" | "ART" | "PERFORMANSE" | "TV"
  description: string
  media: SlideMedia[]
}

export interface SlideMedia {
  src: string
  kind: "image" | "animation"
}
