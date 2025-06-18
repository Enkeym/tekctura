"use client"

import { Button } from "@/components/ui/button/buttonModal/Button"
import React, { useEffect, useState } from "react"
import { ContentModal } from "../contentModal/ContentModal"
import WrapperModal from "../wrapperModal/WrapperModal"
import styles from "./TriggerModal.module.scss"

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
      <Button className={styles.triggerButton} onClick={() => setIsOpen(true)}>
        {buttonLabel}
      </Button>
      <WrapperModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ContentModal title={titleModal}>{children}</ContentModal>
      </WrapperModal>
    </>
  )
}
