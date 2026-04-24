"use client"

import Image from "next/image"

export function HeroHeader() {
  return (
    <header className="w-full">
      <div className="flex items-center justify-center">
        <div className="relative w-full max-w-[1200px] aspect-[1101/1429] overflow-hidden md:aspect-[1695/794]">
          <Image
            src="/images/hero-bg-mobile.jpg"
            alt="Hotel JackCity"
            fill
            className="object-cover object-center md:hidden"
            priority
          />
          <Image
            src="/images/hero-bg.jpg"
            alt="Hotel JackCity"
            fill
            className="hidden object-cover object-center md:block"
            priority
          />
        </div>
      </div>
    </header>
  )
}
