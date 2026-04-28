import { Shield, CalendarX2, Headphones, PawPrint } from "lucide-react"

const ITEMS = [
  {
    icon: (
      <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#FFF3C4" }}>
        <div className="relative">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L14.39 8.26L21 9.27L16.5 13.64L17.78 20.21L12 17L6.22 20.21L7.5 13.64L3 9.27L9.61 8.26L12 2Z"
              fill="#F5A623"
              stroke="#F5A623"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <PawPrint size={11} className="absolute -bottom-0.5 -right-1" style={{ color: "#fff" }} strokeWidth={2.5} />
        </div>
      </div>
    ),
    title: "Curado por Jack",
    desc: "Recomendaciones hechas por expertos (y por Jack)",
  },
  {
    icon: (
      <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#E6F7F0" }}>
        <Shield size={22} strokeWidth={1.8} style={{ color: "#2EB87E" }} />
      </div>
    ),
    title: "Pago seguro",
    desc: "Tus datos y pagos 100% protegidos",
  },
  {
    icon: (
      <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#E8F3FF" }}>
        <CalendarX2 size={22} strokeWidth={1.8} style={{ color: "#3B9EE8" }} />
      </div>
    ),
    title: "Cancelación gratis",
    desc: "Flexibilidad para cambiar tus planes",
  },
  {
    icon: (
      <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#F3EEFF" }}>
        <Headphones size={22} strokeWidth={1.8} style={{ color: "#9B6FE0" }} />
      </div>
    ),
    title: "Atención 24/7",
    desc: "Estamos siempre para ayudarte",
  },
]

export function WhyJackCity() {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ backgroundColor: "#FFFFFF", borderColor: "#E5EAF2" }}
    >
      <h3
        className="text-base font-bold mb-5 text-balance"
        style={{ color: "#0A1830" }}
      >
        ¿Por qué reservar en JackCity?
      </h3>

      <div className="flex flex-col gap-4">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            {item.icon}
            <div>
              <p className="text-sm font-semibold leading-tight mb-0.5" style={{ color: "#0A1830" }}>
                {item.title}
              </p>
              <p className="text-xs leading-snug" style={{ color: "#6B7280" }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
