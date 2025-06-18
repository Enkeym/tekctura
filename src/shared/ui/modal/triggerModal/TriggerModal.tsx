"use client"

import { Button } from "@/shared/ui/button/Button"
import React, { useEffect, useState } from "react"
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
      <Button
        className="transition-transform duration-300 hover:scale-105 hover:opacity-75 focus:scale-105 focus:opacity-75"
        onClick={() => setIsOpen(true)}
      >
        {buttonLabel}
      </Button>
      <WrapperModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ContentModal title={titleModal}>{children}</ContentModal>
      </WrapperModal>
    </>
  )
}
