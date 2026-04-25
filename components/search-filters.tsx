"use client"

import { useState } from "react"
import { MapPin, DollarSign, Home, Star, ArrowUpDown, ChevronDown } from "lucide-react"

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
  const [presupuestoMin, setPresupuestoMin] = useState(30000)
  const [presupuestoMax, setPresupuestoMax] = useState(120000)
  const [tiposSeleccionados, setTiposSeleccionados] = useState<string[]>([])
  const [puntuacionMin, setPuntuacionMin] = useState(6)
  const [ordenarPor, setOrdenarPor] = useState("Recomendados de Jack")

  const toggleTipo = (tipo: string) => {
    setTiposSeleccionados((prev) =>
      prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]
    )
  }

  const formatPrice = (value: number) => {
    return `$${value.toLocaleString("es-CL")}`
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Zona */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={16} style={{ color: "#0A1830" }} />
          <h3 className="text-sm font-bold" style={{ color: "#0A1830" }}>
            Zona
          </h3>
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setZonaOpen(!zonaOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm"
            style={{
              backgroundColor: "#fff",
              borderColor: "#D1D5DB",
              color: "#0A1830",
            }}
          >
            <span>{zona}</span>
            <ChevronDown
              size={16}
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
                  onClick={() => {
                    setZona(z)
                    setZonaOpen(false)
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                  style={{
                    color: "#0A1830",
                    backgroundColor: zona === z ? "#F3F4F6" : "transparent",
                  }}
                >
                  {z}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Presupuesto */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <DollarSign size={16} style={{ color: "#0A1830" }} />
          <h3 className="text-sm font-bold" style={{ color: "#0A1830" }}>
            Presupuesto
          </h3>
        </div>
        <div className="px-1">
          <div className="flex justify-between text-xs mb-2" style={{ color: "#666" }}>
            <span>{formatPrice(presupuestoMin)}</span>
            <span>{formatPrice(presupuestoMax)}</span>
          </div>
          <div className="relative h-2 rounded-full" style={{ backgroundColor: "#E5E7EB" }}>
            <div
              className="absolute h-full rounded-full"
              style={{
                backgroundColor: "#22c55e",
                left: `${((presupuestoMin - 10000) / 190000) * 100}%`,
                right: `${100 - ((presupuestoMax - 10000) / 190000) * 100}%`,
              }}
            />
          </div>
          <div className="flex gap-2 mt-3">
            <input
              type="range"
              min={10000}
              max={200000}
              step={5000}
              value={presupuestoMin}
              onChange={(e) => setPresupuestoMin(Math.min(Number(e.target.value), presupuestoMax - 10000))}
              className="flex-1 accent-green-500"
            />
            <input
              type="range"
              min={10000}
              max={200000}
              step={5000}
              value={presupuestoMax}
              onChange={(e) => setPresupuestoMax(Math.max(Number(e.target.value), presupuestoMin + 10000))}
              className="flex-1 accent-green-500"
            />
          </div>
        </div>
      </div>

      {/* Tipo Alojamiento */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Home size={16} style={{ color: "#0A1830" }} />
          <h3 className="text-sm font-bold" style={{ color: "#0A1830" }}>
            Tipo Alojamiento
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          {TIPOS_ALOJAMIENTO.map((tipo) => (
            <label
              key={tipo}
              className="flex items-start gap-2.5 cursor-pointer group"
            >
              <div
                className="w-4 h-4 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                style={{
                  borderColor: tiposSeleccionados.includes(tipo) ? "#22c55e" : "#D1D5DB",
                  backgroundColor: tiposSeleccionados.includes(tipo) ? "#22c55e" : "#fff",
                }}
              >
                {tiposSeleccionados.includes(tipo) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={tiposSeleccionados.includes(tipo)}
                onChange={() => toggleTipo(tipo)}
                className="sr-only"
              />
              <span
                className="text-sm leading-tight group-hover:text-green-700 transition-colors"
                style={{ color: "#444" }}
              >
                {tipo}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Puntuación */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Star size={16} style={{ color: "#0A1830" }} />
          <h3 className="text-sm font-bold" style={{ color: "#0A1830" }}>
            Puntuación mínima
          </h3>
        </div>
        <div className="px-1">
          <div className="flex justify-between mb-1">
            {[6, 7, 8, 9].map((val) => (
              <span
                key={val}
                className="text-xs font-medium"
                style={{ color: puntuacionMin === val ? "#22c55e" : "#888" }}
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
            className="w-full accent-green-500"
          />
        </div>
      </div>

      {/* Ordenar Por */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ArrowUpDown size={16} style={{ color: "#0A1830" }} />
          <h3 className="text-sm font-bold" style={{ color: "#0A1830" }}>
            Ordenar Por
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          {ORDENAR_OPTIONS.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
                style={{
                  borderColor: ordenarPor === option ? "#22c55e" : "#D1D5DB",
                }}
              >
                {ordenarPor === option && (
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#22c55e" }}
                  />
                )}
              </div>
              <input
                type="radio"
                name="ordenar"
                checked={ordenarPor === option}
                onChange={() => setOrdenarPor(option)}
                className="sr-only"
              />
              <span
                className="text-sm group-hover:text-green-700 transition-colors"
                style={{ color: "#444" }}
              >
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
