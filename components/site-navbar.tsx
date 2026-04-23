"use client"

import Image from "next/image"

export function SiteNavbar() {
  return (
    <nav className="sticky top-0 z-50">
      <div className="flex items-center justify-center">
        <div
          className="w-full max-w-[1200px] px-6 flex items-center justify-between h-11"
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
          <div className="flex items-center gap-1">
            {["Hotel", "Cómo Funciona", "Testimonios", "Contacto"].map((item) => (
              <a
                key={item}
                href="#"
                className="px-3 py-1 text-xs font-medium text-white rounded-md transition-colors hover:bg-white/20"
              >
                {item}
              </a>
            ))}
            <a
              href="#"
              className="ml-2 px-3 py-1 text-xs font-semibold rounded-md transition-colors"
              style={{
                backgroundColor: "#F7EEDF",
                color: "#1F3A36",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F2E3CB"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#F7EEDF"
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
