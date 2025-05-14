"use client"

import { useState } from "react"
import ModalWrapper from "../ui/ModalWrapper"

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const ContactModal = ({ isOpen, onClose }: Props) => {
  const [form, setForm] = useState({ name: "", phone: "" })
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    if (res.ok) {
      setSent(true)
      setForm({ name: "", phone: "", message: "" })
      setTimeout(() => {
        onClose()
        setSent(false)
      }, 2000)
    }
  }

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      {sent ? <h2>Спасибо, мы с вами свяжемся!</h2> : ffgf}
    </ModalWrapper>
  )
}
