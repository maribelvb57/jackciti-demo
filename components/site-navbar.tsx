"use client"

import { Show, SignInButton, UserButton } from "@clerk/nextjs"
import Image from "next/image"

export function SiteNavbar() {
  return (
    <nav className="sticky top-0 z-50">
      <div className="flex items-center justify-center">
        <div
          className="w-full max-w-[1200px] px-4 md:px-6 flex items-center justify-between h-11"
          style={{ backgroundColor: "#004d99" }}
        >
          {/* Logo compacto */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo-02.png"
              alt="JackCity"
              width={28}
              height={28}
              className="rounded-full"
            />
            <span className="text-sm font-bold tracking-tight text-white">JackCity</span>
          </div>

          {/* Links */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center gap-1">
              {["Hotel", "Cómo Funciona", "Testimonios", "Contacto"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="px-3 py-1 text-xs font-medium text-white rounded-md transition-colors hover:bg-white/20"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="md:ml-2 flex items-center gap-2">
              <Show when="signed-out">
                <SignInButton>
                  <button
                    type="button"
                    className="px-3 py-1 text-xs font-semibold rounded-md transition-colors"
                    style={{ backgroundColor: "#FF6B5B", color: "#ffffff" }}
                  >
                    Ingresar
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
