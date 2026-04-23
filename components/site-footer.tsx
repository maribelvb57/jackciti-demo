"use client"

const footerLinks = [
  {
    title: "Petstay",
    links: [
      { label: "Quiénes somos", href: "#" },
      { label: "Nuestro equipo", href: "#" },
      { label: "Trabaja con nosotros", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Hoteles",
    links: [
      { label: "Buscar hoteles", href: "#" },
      { label: "Hoteles destacados", href: "#" },
      { label: "Registrar mi hotel", href: "#" },
      { label: "Ciudades disponibles", href: "#" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { label: "Contáctanos", href: "#" },
      { label: "Centro de ayuda", href: "#" },
      { label: "Preguntas frecuentes", href: "#" },
      { label: "Estado del servicio", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Política de reservas", href: "#" },
      { label: "Política de cancelación", href: "#" },
      { label: "Términos y condiciones", href: "#" },
      { label: "Privacidad y datos", href: "#" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer style={{ backgroundColor: "#111111", color: "#D6D9DF" }}>
      <div className="mx-auto max-w-[1100px] px-6 pt-14 pb-8">

        {/* Top: logo + columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "#D4AA20" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <ellipse cx="5.5" cy="7.5" rx="2" ry="3" fill="#fff" />
                  <ellipse cx="9" cy="5" rx="1.8" ry="2.7" fill="#fff" />
                  <ellipse cx="15" cy="5" rx="1.8" ry="2.7" fill="#fff" />
                  <ellipse cx="18.5" cy="7.5" rx="2" ry="3" fill="#fff" />
                  <path
                    d="M7 12.5c0-2.8 2-5.5 5-5.5s5 2.7 5 5.5c0 2-1.2 3.5-3 4.2a5.5 5.5 0 0 1-4 0C8.2 16 7 14.5 7 12.5z"
                    fill="#fff"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">
                Petstay
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#A6AFBD" }}>
              El hotel de perros que tu peque se merece. Profesional, acogedor y con todo el amor del mundo.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-5">
              {["IG", "FB", "TW"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors hover:text-white"
                  style={{ backgroundColor: "#232323", color: "#C7CED9" }}
                  aria-label={s === "IG" ? "Instagram" : s === "FB" ? "Facebook" : "Twitter"}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#D4AA20")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#232323")}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold mb-4 text-white">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "#A6AFBD" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AA20")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#A6AFBD")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t mb-6" style={{ borderColor: "#2B2B2B" }} />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ color: "#7F8897" }}>
            &copy; {new Date().getFullYear()} Petstay. Todos los derechos reservados.
          </p>
          <p className="text-xs" style={{ color: "#7F8897" }}>
            Hecho con amor para los perritos de Chile
          </p>
        </div>
      </div>
    </footer>
  )
}
