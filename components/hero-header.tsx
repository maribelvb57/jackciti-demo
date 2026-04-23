"use client"

import Image from "next/image"

export function HeroHeader() {
  return (
    <header className="w-full">
      <div className="flex items-center justify-center">
        <div className="relative w-full max-w-[1200px] aspect-[1695/794] overflow-hidden">
          <Image
            src="/images/hero-bg.jpg"
            alt="Hotel Petstay"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </header>
  )
}
