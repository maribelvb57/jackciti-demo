"use client"

import { useState } from "react"
import { MapPin, DollarSign, Home, Star, ArrowUpDown, ChevronDown } from "lucide-react"

const DARK = "#4B5563"

const ZONAS = [
  "Todas las zonas",
  "Santiago Oriente",
  "Norte de Santiago",
  "Sur de Santiago",
  "Santiago Poniente",
]

const TIPOS_ALOJAMIENTO = [
  "En sitio campestre",
  "Canil Individual",
  "Libre de Jaulas",
  "Veterinario On Site",
  "Comida Incluida",
  "Servicio de Baño/peluquería adicional",
  "Recibe perras en celo",
  "Recibe perros sin castrar",
  "Cancelación gratis",
]

const ORDENAR_OPTIONS = [
  "Recomendados de Jack",
  "Precio menor a mayor",
  "Precio mayor a menor",
  "Mejor puntuación Usuarios",
]

export function SearchFilters() {
  const [zona, setZona] = useState("Todas las zonas")
  const [zonaOpen, setZonaOpen] = useState(false)
  const [presupuesto, setPresupuesto] = useState(120000)
  const [tiposSeleccionados, setTiposSeleccionados] = useState<string[]>([])
  const [puntuacionMin, setPuntuacionMin] = useState(6)
  const [ordenarPor, setOrdenarPor] = useState("Recomendados de Jack")

  const toggleTipo = (tipo: string) => {
    setTiposSeleccionados((prev) =>
      prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]
    )
  }

  const formatPrice = (value: number) =>
    `$${value.toLocaleString("es-CL")}`

  const sliderPct = ((presupuesto - 30000) / (120000 - 30000)) * 100

  return (
    <div className="flex flex-col gap-6 w-full overflow-x-hidden">

      {/* Zona */}
      <div className="w-full">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={15} style={{ color: DARK }} />
          <h3 className="text-sm font-bold" style={{ color: "#0A1830" }}>Zona</h3>
        </div>
        <div className="relative w-full">
          <button
            type="button"
            onClick={() => setZonaOpen(!zonaOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm"
            style={{ backgroundColor: "#fff", borderColor: "#D1D5DB", color: "#0A1830" }}
          >
            <span className="truncate">{zona}</span>
            <ChevronDown
              size={15}
              className="flex-shrink-0 ml-1"
              style={{
                color: "#666",
                transform: zonaOpen ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
              }}
            />
          </button>
          {zonaOpen && (
            <div
              className="absolute top-full mt-1 left-0 right-0 z-10 rounded-lg border shadow-lg overflow-hidden"
              style={{ backgroundColor: "#fff", borderColor: "#D1D5DB" }}
            >
              {ZONAS.map((z) => (
                <button
                  key={z}
                  type="button"
                  onClick={() => { setZona(z); setZonaOpen(false) }}
                  className="w-full px-3 py-2 text-left text-sm transition-colors"
                  style={{
                    color: "#0A1830",
                    backgroundColor: zona === z ? "#EFF6FF" : "transparent",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EFF6FF")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = zona === z ? "#EFF6FF" : "transparent")}
                >
                  {z}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "#C5D0E0" }} />

      {/* Presupuesto — slider único */}
      <div className="w-full">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign size={15} style={{ color: DARK }} />
          <h3 className="text-sm font-bold" style={{ color: "#0A1830" }}>Presupuesto</h3>
        </div>
        <div className="px-3 w-full">
          {/* Track + fill + slider */}
          <div className="relative h-6 mb-2">
            {/* Track background */}
            <div
              className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 rounded-full"
              style={{ backgroundColor: "#C5D0E0" }}
            />
            {/* Fill */}
            <div
              className="absolute top-1/2 -translate-y-1/2 left-0 h-1.5 rounded-full"
              style={{ width: `${sliderPct}%`, backgroundColor: "#E05B3A" }}
            />
            {/* Native slider on top */}
            <input
              type="range"
              min={30000}
              max={120000}
              step={5000}
              value={presupuesto}
              onChange={(e) => setPresupuesto(Number(e.target.value))}
              className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0"
            />
            {/* Custom thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full shadow-md border-2 pointer-events-none"
              style={{
                left: `calc(${sliderPct}% - 10px)`,
                backgroundColor: "#fff",
                borderColor: "#E05B3A",
              }}
            />
          </div>
          <div className="flex justify-between text-xs" style={{ color: "#555" }}>
            <span>$30.000</span>
            <span className="font-bold" style={{ color: "#E05B3A" }}>{formatPrice(presupuesto)}</span>
            <span>$120.000</span>
          </div>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "#C5D0E0" }} />

      {/* Tipo Alojamiento */}
      <div className="w-full">
        <div className="flex items-center gap-2 mb-3">
          <Home size={15} style={{ color: DARK }} />
          <h3 className="text-sm font-bold" style={{ color: "#0A1830" }}>Tipo Alojamiento</h3>
        </div>
        <div className="flex flex-col gap-2.5">
          {TIPOS_ALOJAMIENTO.map((tipo) => {
            const checked = tiposSeleccionados.includes(tipo)
            return (
              <label key={tipo} className="flex items-start gap-2.5 cursor-pointer select-none" onClick={() => toggleTipo(tipo)}>
                <div
                  className="w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{
                    borderColor: checked ? "#E05B3A" : "#999",
                    backgroundColor: checked ? "#E05B3A" : "#fff",
                  }}
                >
                  {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-sm leading-tight" style={{ color: "#222" }}>{tipo}</span>
              </label>
            )
          })}
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "#C5D0E0" }} />

      {/* Puntuación */}
      <div className="w-full">
        <div className="flex items-center gap-2 mb-3">
          <Star size={15} style={{ color: DARK }} />
          <h3 className="text-sm font-bold" style={{ color: "#0A1830" }}>Puntuación mínima</h3>
        </div>
        <div className="px-3 w-full">
          <div className="flex justify-between mb-2">
            {[6, 7, 8, 9].map((val) => (
              <span
                key={val}
                className="text-xs font-semibold"
                style={{ color: puntuacionMin === val ? "#E05B3A" : "#888" }}
              >
                {val}+
              </span>
            ))}
          </div>
          <input
            type="range"
            min={6}
            max={9}
            step={1}
            value={puntuacionMin}
            onChange={(e) => setPuntuacionMin(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: "#E05B3A" }}
          />
        </div>
      </div>

      <div className="border-t" style={{ borderColor: "#C5D0E0" }} />

      {/* Ordenar Por */}
      <div className="w-full pb-4">
        <div className="flex items-center gap-2 mb-3">
          <ArrowUpDown size={15} style={{ color: DARK }} />
          <h3 className="text-sm font-bold" style={{ color: "#0A1830" }}>Ordenar Por</h3>
        </div>
        <div className="flex flex-col gap-2.5">
          {ORDENAR_OPTIONS.map((option) => {
            const selected = ordenarPor === option
            return (
              <label key={option} className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => setOrdenarPor(option)}>
                <div
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ borderColor: selected ? DARK : "#999" }}
                >
                  {selected && (
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#fff" }} />
                  )}
                </div>
                <span className="text-sm" style={{ color: "#222" }}>{option}</span>
              </label>
            )
          })}
        </div>
      </div>

    </div>
  )
}
