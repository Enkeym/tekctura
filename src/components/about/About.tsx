"use client"

import { useState } from "react"
import { Button } from "../ui/button/Button"

import { CustomVideoPlayer } from "../ui/media/video/CustomVideoPlayer"
import WrapperModal from "../ui/modal/wrapperModal/WrapperModal"

export const About = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>КТО МЫ?</Button>

      <WrapperModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1rem"
          }}
        >
          <CustomVideoPlayer
            src="/assets/videos/tv_3.webm"
            alt="Медиаинсталляция студии ТЕКСТУРА в действии"
          />

          <p>
            Мы — студия медиа-дизайна ТЕКСТУРА. Объединяем технологии, искусство
            и ощущения, чтобы создавать уникальные медиа-инсталляции,
            сопровождение мероприятий и аудиовизуальные решения.
          </p>
          <p>
            Работаем с брендами, арт-пространствами и культурными институциями.
            Наш подход — креатив, технологичность и точная реализация.
          </p>
          <p>
            В нашем арсенале — современное оборудование, генеративная графика,
            взаимодействие с пространством и светом, интеграция реального и
            цифрового.
          </p>
        </div>
      </WrapperModal>
    </>
  )
}
