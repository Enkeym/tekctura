import Image from "next/image"
import { TriggerModal } from "../ui/modal/triggerModal/TriggerModal"

export const About = () => {
  return (
    <TriggerModal buttonLabel="КТО МЫ?" titleModal="О НАС">
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Image
          alt="Медиаинсталляция студии ТЕКСТУРА в действии"
          src="/assets/videos/tv_3.gif"
          width={200}
          height={200}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "1rem",
            objectFit: "cover"
          }}
        />
        <p>
          Мы — студия медиа-дизайна ТЕКСТУРА. Объединяем технологии, искусство и
          ощущения, чтобы создавать уникальные медиа-инсталляции, сопровождение
          мероприятий и аудиовизуальные решения.
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
    </TriggerModal>
  )
}
