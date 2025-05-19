"use client"

import { CiInstagram, CiMail } from "react-icons/ci"
import { PiTelegramLogoLight } from "react-icons/pi"
import { About } from "../about/About"
import { Contact } from "../contact/Contact"
import styles from "./Footer.module.scss"

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <a
          className={styles.icon}
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CiInstagram />
        </a>
        <a className={styles.icon} href="mailto:example@mail.com">
          <CiMail />
        </a>
        <a
          className={styles.icon}
          href="https://t.me/username"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PiTelegramLogoLight />
        </a>
      </div>

      <div className={styles.center}>
        <About />
      </div>

      <div className={styles.right}>
        <Contact />
      </div>
    </footer>
  )
}
