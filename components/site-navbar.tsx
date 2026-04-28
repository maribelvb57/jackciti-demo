"use client"

import { User } from "lucide-react"

export function SiteNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full" style={{ backgroundColor: "#0D2B45" }}>
      <div className="w-full px-6 md:px-10 flex items-center justify-between h-14">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <img
            src="/images/dog-banner.png"
            alt="JackCity mascot"
            className="w-9 h-9 object-contain"
          />
          <span className="text-lg font-bold tracking-tight">
            <span style={{ color: "#ffffff" }}>Jack</span>
            <span style={{ color: "#FFC43D" }}>City</span>
          </span>
          <span className="text-sm font-medium ml-1" style={{ color: "#8899AA" }}>35</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-1">
          {["Hotel", "Cómo Funciona", "Testimonios", "Contacto"].map((item) => (
            <a
              key={item}
              href="#"
              className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-white/10"
              style={{ color: "#ffffff" }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Ingresar button */}
        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#FFC43D", color: "#0D2B45" }}
        >
          <User size={15} strokeWidth={2.5} />
          Ingresar
        </button>

      </div>
    </nav>
  )
}
