import { TriggerModal } from "@/components/ui/modal/triggerModal/TriggerModal"
import { useRef, useState } from "react"
import { IMaskInput } from "react-imask"

function generateFormToken() {
  return Math.random().toString(36).substring(2)
}

export const Contact = () => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")
  const [isBlocked, setIsBlocked] = useState(false)
  const [botField, setBotField] = useState("")
  const [formToken] = useState(generateFormToken())

  const closeModalRef = useRef<() => void>(() => {})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (botField) return

    if (isBlocked) {
      alert("Вы уже отправили заявку. Подождите немного перед повтором.")
      return
    }

    if (phone.replace(/\D/g, "").length !== 10) {
      alert("Введите корректный номер телефона")
      return
    }

    setStatus("loading")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone: "+7" + phone.replace(/\D/g, ""),
          token: formToken,
          hiddenField: botField
        })
      })

      if (!res.ok) throw new Error("Ошибка отправки")

      setStatus("success")
      setIsBlocked(true)
      setName("")
      setPhone("")

      setTimeout(() => {
        closeModalRef.current()
        setStatus("idle")
      }, 1000)

      setTimeout(() => {
        setIsBlocked(false)
      }, 5000)
    } catch {
      setStatus("error")
    }
  }

  return (
    <TriggerModal
      buttonLabel="НАПИШИ МНЕ"
      titleModal="Связаться с нами"
      onRequestClose={(close) => {
        closeModalRef.current = close
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={botField}
          onChange={(e) => setBotField(e.target.value)}
          style={{ display: "none" }}
          autoComplete="off"
          tabIndex={-1}
        />

        <input
          type="text"
          placeholder="ИМЯ"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Телефон с не удаляемым +7 */}
        <IMaskInput
          mask="+7 000 000-00-00"
          value={phone}
          unmask={true}
          onAccept={(value) => setPhone(value)}
          placeholder="+7 999 999-99-99"
          type="tel"
          required
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #888",
            backgroundColor: "#000",
            color: "#fff"
          }}
        />

        <button type="submit" disabled={status === "loading" || isBlocked}>
          {status === "loading"
            ? "Отправка..."
            : isBlocked
            ? "Подождите..."
            : "Отправить"}
        </button>

        {status === "success" && (
          <p style={{ color: "limegreen", marginTop: "1rem" }}>
            ✅ Заявка отправлена! Закроется через 1 сек.
          </p>
        )}
        {status === "error" && (
          <p style={{ color: "red", marginTop: "1rem" }}>
            ❌ Ошибка отправки. Попробуйте позже.
          </p>
        )}
      </form>
    </TriggerModal>
  )
}
