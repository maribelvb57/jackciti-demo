"use client"

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
            <a
              href="#"
              className="px-3 py-1 text-xs font-semibold rounded-md transition-colors md:ml-2"
              style={{
                backgroundColor: "#FF6B5B",
                color: "#ffffff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#FF5144"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#FF6B5B"
              }}
            >
              Ingresar
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
