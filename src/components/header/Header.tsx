"use client"

import { Logo } from "../logo/Logo"
import { TickerWrapper } from "../ticker/TickerWrapper"

export const Header = () => {
  return (
    <header
      className="relative z-[1000] flex h-[15vh] w-full items-center justify-between gap-8 overflow-hidden border-b border-white/10 bg-black px-10 py-6 text-white md:flex-wrap md:justify-center md:gap-4 md:p-6 md:h-auto"
      role="banner"
      aria-label="Шапка сайта"
    >
      <div
        className="flex h-auto max-h-12 w-auto flex-shrink-0 items-center transition-transform hover:scale-105 focus:scale-105 md:w-full md:justify-center"
        aria-label="Логотип студии"
        role="img"
      >
        <Logo />
      </div>

      <div className="flex-1 overflow-hidden md:order-2 md:w-full" aria-hidden="true">
        <TickerWrapper />
      </div>
    </header>
  )
}
