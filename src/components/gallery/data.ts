import { Slide } from "./types/slide"

export const slides: Slide[] = [
  {
    title: "Цифровой лес",
    description:
      "Иммерсивная аудиовизуальная инсталляция, воссоздающая ритмы цифровой природы. Световые потоки и звуковые ландшафты формируют синтетическое ощущение леса будущего.",
    media: [
      { src: "/assets/videos/les.webp", kind: "animation" },
      { src: "/assets/videos/les_2.webp", kind: "animation" }
    ]
  },
  {
    title: "ЭХО",
    description:
      "Экспериментальное видео, исследующее эффект памяти и цифрового дублирования в медиасреде. Каждый кадр — это отражение, потерявшее оригинал.",
    media: [
      { src: "/assets/videos/tv_3_2.webp", kind: "animation" },
      { src: "/assets/videos/tv_3.webp", kind: "animation" }
    ]
  },
  {
    title: "Перформанс",
    description:
      "Серия визуальных и сценографических решений, разработанных для живого выступления. Синтез света, движения и архитектуры пространства.",
    media: [
      { src: "/assets/images/Light-5.jpg", kind: "image" },
      {
        src: "/assets/images/Firelight-Labyrinth_render-02_supplied.jpg",
        kind: "image"
      },
      { src: "/assets/images/SOF_8434.jpg", kind: "image" }
    ]
  }
]
