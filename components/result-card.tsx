"use client"

import Image from "next/image"
import { MapPin, Check } from "lucide-react"

export type ResultCardData = {
  name: string
  score: number
  scoreLabel: string
  reviewCount: number
  address: string
  features: string[]
  freeCancellation: boolean
  petCount: number
  nights: number
  price: number
  imageUrl: string
}

type ResultCardProps = {
  data: ResultCardData
}

export function ResultCard({ data }: ResultCardProps) {
  return (
    <div
      className="flex rounded-2xl border overflow-hidden"
      style={{
        borderColor: "#D1D5DB",
        backgroundColor: "#FFFFFF",
        minHeight: 320,
      }}
    >
      {/* Left: Photo */}
      <div className="relative flex-shrink-0" style={{ width: 280 }}>
        <Image
          src={data.imageUrl}
          alt={data.name}
          fill
          className="object-cover"
          sizes="280px"
        />
      </div>

      {/* Right: Info */}
      <div className="flex flex-col flex-1 p-6">
        {/* Top section */}
        <div className="flex-1">
          {/* Name */}
          <h2 className="text-2xl font-bold mb-3 leading-tight" style={{ color: "#0A1830" }}>
            {data.name}
          </h2>

          {/* Score + reviews */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex items-center justify-center w-12 h-10 rounded-lg text-white font-bold text-base flex-shrink-0"
              style={{ backgroundColor: "#0B3D91" }}
            >
              {data.score.toFixed(1).replace(".", ",")}
            </div>
            <span className="text-base" style={{ color: "#444" }}>
              <span className="font-semibold" style={{ color: "#222" }}>{data.scoreLabel}</span>
              {" · "}
              {data.reviewCount} comentarios
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 mb-4">
            <div
              className="flex items-center justify-center w-9 h-9 rounded-lg border flex-shrink-0"
              style={{ borderColor: "#D1D5DB" }}
            >
              <MapPin size={18} style={{ color: "#444" }} />
            </div>
            <span className="text-base" style={{ color: "#444" }}>
              {data.address}
            </span>
          </div>

          {/* Features box */}
          <div
            className="rounded-xl px-5 py-4 mb-4"
            style={{ backgroundColor: "#E8F5F0" }}
          >
            <ul className="flex flex-col gap-1.5">
              {data.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm" style={{ color: "#1a1a1a" }}>
                  <Check size={15} style={{ color: "#16a34a", flexShrink: 0 }} strokeWidth={2.5} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom: Pricing block — right aligned */}
        <div className="flex flex-col items-end gap-0.5">
          {data.freeCancellation && (
            <div className="flex items-center gap-1.5 mb-1">
              <Check size={15} style={{ color: "#16a34a" }} strokeWidth={2.5} />
              <span className="text-sm font-semibold" style={{ color: "#16a34a" }}>
                Cancelación gratis
              </span>
            </div>
          )}
          <p className="text-lg" style={{ color: "#555" }}>
            {data.petCount} {data.petCount === 1 ? "mascota" : "mascotas"}, {data.nights} {data.nights === 1 ? "noche" : "noches"}
          </p>
          <p className="text-4xl font-bold leading-tight" style={{ color: "#0A1830" }}>
            $ {data.price.toLocaleString("es-CL")}
          </p>
          <p className="text-sm" style={{ color: "#777" }}>
            IVA incluído
          </p>
        </div>
      </div>
    </div>
  )
}
