"use client"

import { Button } from "@/components/ui/button/Button"
import { useEffect, useState } from "react"
import { ContentModal } from "../contentModal/ContentModal"
import WrapperModal from "../wrapperModal/WrapperModal"

interface TriggerModalProps {
  buttonLabel?: string
  titleModal?: string
  children?: React.ReactNode
  onRequestClose?: (closeFn: () => void) => void
}

export const TriggerModal = ({
  buttonLabel,
  children,
  titleModal,
  onRequestClose
}: TriggerModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (onRequestClose) {
      onRequestClose(() => setIsOpen(false))
    }
  }, [onRequestClose])

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{buttonLabel}</Button>
      <WrapperModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ContentModal title={titleModal}>{children}</ContentModal>
      </WrapperModal>
    </>
  )
}
