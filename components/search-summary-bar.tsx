"use client"

import { MapPin, Calendar, PawPrint, Car } from "lucide-react"

interface SearchSummaryData {
  city: string
  dateFrom: string
  dateTo: string
  petCount: number
  withTransport: boolean
}

interface SearchSummaryBarProps {
  data: SearchSummaryData
  onChangeClick: () => void
}

export function SearchSummaryBar({ data, onChangeClick }: SearchSummaryBarProps) {
  return (
    <div className="w-full py-3 px-4" style={{ backgroundColor: "#FFC43D" }}>
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
        {/* City */}
        <div 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
          style={{ backgroundColor: "rgba(255,255,255,0.85)", color: "#0A1830" }}
        >
          <MapPin size={14} />
          <span>{data.city}</span>
        </div>

        {/* Dates */}
        <div 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
          style={{ backgroundColor: "rgba(255,255,255,0.85)", color: "#0A1830" }}
        >
          <Calendar size={14} />
          <span>{data.dateFrom} - {data.dateTo}</span>
        </div>

        {/* Pet count */}
        <div 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
          style={{ backgroundColor: "rgba(255,255,255,0.85)", color: "#0A1830" }}
        >
          <PawPrint size={14} />
          <span>{data.petCount} {data.petCount === 1 ? "mascota" : "mascotas"}</span>
        </div>

        {/* Transport */}
        <div 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
          style={{ backgroundColor: "rgba(255,255,255,0.85)", color: "#0A1830" }}
        >
          <Car size={14} />
          <span>Transporte {data.withTransport ? "CON" : "SIN"}</span>
        </div>

        {/* Change button */}
        <button
          onClick={onChangeClick}
          className="flex items-center px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-colors hover:bg-white/20"
          style={{ borderColor: "#0A1830", color: "#0A1830", backgroundColor: "transparent" }}
        >
          Cambiar
        </button>
      </div>
    </div>
  )
}
