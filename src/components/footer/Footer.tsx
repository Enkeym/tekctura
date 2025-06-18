"use client"

import { CiInstagram, CiMail } from "react-icons/ci"
import { PiTelegramLogoLight } from "react-icons/pi"
import { About } from "../about/About"
import { Contact } from "../contact/Contact"


export const Footer = () => {
  return (
    <footer
      className="flex h-[15vh] w-full items-center border-t border-white/10 bg-black px-10 py-6 text-white md:h-auto md:px-0"
      aria-label="Подвал сайта"
    >
      <div className="flex w-full items-center justify-between md:flex-wrap md:gap-4">
        {/* Левый блок — About */}
        <section className="flex flex-1 justify-start md:justify-center" aria-labelledby="footer-about-heading">
          <About />
        </section>

        {/* Центр — соц. иконки */}
        <section className="flex flex-1 justify-center" aria-labelledby="footer-social-heading">
          <ul className="flex list-none flex-row items-center gap-4 p-0">
            <li>
              <a
                className="text-[1.6rem] text-white transition-transform hover:scale-110 hover:opacity-75 focus:scale-110 focus:opacity-75"
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
                className="text-[1.6rem] text-white transition-transform hover:scale-110 hover:opacity-75 focus:scale-110 focus:opacity-75"
                href="mailto:example@mail.com"
                aria-label="Отправить письмо на email"
              >
                <CiMail />
              </a>
            </li>
            <li>
              <a
                className="text-[1.6rem] text-white transition-transform hover:scale-110 hover:opacity-75 focus:scale-110 focus:opacity-75"
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
          className="flex flex-1 justify-end md:justify-center md:text-center"
          aria-labelledby="footer-contact-heading"
        >
          <Contact />
        </section>
      </div>
    </footer>
  )
}
