"use client"

import { CiInstagram, CiMail } from "react-icons/ci"
import { PiTelegramLogoLight } from "react-icons/pi"
import { About } from "../about/About"
import { Contact } from "../contact/Contact"
import styles from "./Footer.module.scss"

export const Footer = () => {
  return (
    <footer className={styles.footer} aria-label="Подвал сайта">
      <div className={styles.content}>
        {/* Левый блок — About */}
        <section className={styles.left} aria-labelledby="footer-about-heading">
          <About />
        </section>

        {/* Центр — соц. иконки */}
        <section
          className={styles.center}
          aria-labelledby="footer-social-heading"
        >
          <ul className={styles.socialList}>
            <li>
              <a
                className={styles.icon}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <CiInstagram />
              </a>
            </li>
            <li>
              <a
                className={styles.icon}
                href="mailto:example@mail.com"
                aria-label="Отправить письмо на email"
              >
                <CiMail />
              </a>
            </li>
            <li>
              <a
                className={styles.icon}
                href="https://t.me/username"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
              >
                <PiTelegramLogoLight />
              </a>
            </li>
          </ul>
        </section>

        {/* Правый блок — Контакты */}
        <section
          className={styles.right}
          aria-labelledby="footer-contact-heading"
        >
          <Contact />
        </section>
      </div>
    </footer>
  )
}
