import { ShieldCheck, Heart, Smile } from "lucide-react"

const AMBER = "#FFC43D"

const BENEFITS = [
  {
    icon: <ShieldCheck size={28} strokeWidth={1.8} style={{ color: AMBER }} />,
    title: "Seguridad ante todo",
  },
  {
    icon: <Heart size={28} strokeWidth={1.8} style={{ color: AMBER }} />,
    title: "Cuidado y amor garantizado",
  },
  {
    icon: <Smile size={28} strokeWidth={1.8} style={{ color: AMBER }} />,
    title: "Vacaciones caninas felices",
    hasHeart: true,
  },
]

export function SearchBenefitsBanner() {
  return (
    <div
      className="rounded-2xl flex items-center justify-between gap-4 px-5 py-4 mb-5 overflow-hidden"
      style={{ backgroundColor: "#FDF6E3", border: "1px solid #F0E4C0" }}
    >
      {/* Benefits list */}
      <div className="flex items-center gap-6 flex-1 flex-wrap">
        {BENEFITS.map((b, i) => (
          <div key={i} className="flex items-center gap-2.5 min-w-[120px]">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
              style={{ backgroundColor: "#FFE8B6" }}
            >
              {b.icon}
            </div>
            <span className="text-xs font-semibold leading-snug" style={{ color: "#0A1830", maxWidth: 100 }}>
              {b.title}
              {b.hasHeart && <Heart size={12} style={{ color: AMBER, marginLeft: "4px", display: "inline" }} />}
            </span>
          </div>
        ))}
      </div>

      {/* Dog image + speech bubble */}
      <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
        {/* Speech bubble */}
        <div
          className="relative rounded-2xl px-3 py-2 text-xs font-semibold leading-snug text-center"
          style={{ backgroundColor: "#FFE8B6", color: "#0A1830", maxWidth: 140 }}
        >
          Aqui los perros la pasan increible.
          <span style={{ color: AMBER }}> Como se merecen!</span>
          {/* Tail pointing right */}
          <span
            className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0"
            style={{
              borderTop: "7px solid transparent",
              borderBottom: "7px solid transparent",
              borderLeft: "8px solid #FFE8B6",
            }}
          />
        </div>
        {/* Dog image without circle */}
        <img
          src="/images/dog-banner.jpg"
          alt="Jack el perro"
          className="hidden lg:block w-20 h-20 object-cover flex-shrink-0"
        />
      </div>
    </div>
  )
}
