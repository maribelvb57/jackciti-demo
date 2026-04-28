"use client"

import { ShieldCheck, Heart, Camera } from "lucide-react"

const AMBER = "#FFC43D"
const NAVY = "#0D2B45"
const BG_CREAM = "#FEF8ED"

const BENEFITS = [
  {
    icon: <ShieldCheck size={24} strokeWidth={2} style={{ color: NAVY }} />,
    title: "Seguridad ante todo",
  },
  {
    icon: <Heart size={24} strokeWidth={2} style={{ color: NAVY }} />,
    title: "Cuidado y amor garantizado",
  },
  {
    icon: <Camera size={24} strokeWidth={2} style={{ color: NAVY }} />,
    title: "Transparencia 24/7",
  },
]

export function SearchBenefitsBanner() {
  return (
    <div
      className="relative rounded-2xl flex items-center justify-between gap-6 px-6 py-5 mb-6 overflow-visible"
      style={{ backgroundColor: BG_CREAM }}
    >
      {/* Decorative shine element */}
      <div
        className="absolute top-2 right-8 text-3xl"
        style={{ color: AMBER }}
      >
        ✨
      </div>

      {/* Benefits grid - left side */}
      <div className="flex items-center gap-8 flex-1">
        {BENEFITS.map((b, i) => (
          <div key={i} className="flex items-center gap-3 flex-shrink-0">
            {/* Icon circle */}
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0 shadow-sm"
              style={{ backgroundColor: AMBER }}
            >
              {b.icon}
            </div>
            {/* Text */}
            <span
              className="text-sm font-bold leading-tight"
              style={{ color: NAVY, maxWidth: 120 }}
            >
              {b.title}
            </span>
          </div>
        ))}
      </div>

      {/* Right side - Dog + Speech bubble */}
      <div className="hidden lg:flex items-end gap-3 flex-shrink-0 relative">
        {/* Dog image */}
        <img
          src="/images/dog-banner.png"
          alt="Jack el perro"
          className="w-24 h-24 object-contain flex-shrink-0"
        />

        {/* Speech bubble */}
        <div
          className="relative rounded-xl px-3 py-2.5 text-xs font-bold leading-snug text-center"
          style={{ backgroundColor: AMBER, color: NAVY, minWidth: 120, marginBottom: 4 }}
        >
          Aquí los perros la pasan increible.
          <br />
          <span>¡Como se merecen!</span>
          <div
            className="flex justify-center mt-1"
            style={{ fontSize: "14px" }}
          >
            ❤️
          </div>
          {/* Tail pointing left */}
          <span
            className="absolute bottom-2 -left-2 w-0 h-0"
            style={{
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent",
              borderRight: `8px solid ${AMBER}`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
