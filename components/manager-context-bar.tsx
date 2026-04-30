"use client"

import { useEffect, useState } from "react"
import { Building2, UserCircle, CalendarDays } from "lucide-react"

interface ManagerContextBarProps {
  hotelId: string
}

const DAY_NAMES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
const MONTH_NAMES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
]

// Mock data – replace with real session/hotel data
const MOCK_HOTEL_NAME = "Hotel Jackciti Boutique"
const MOCK_MANAGER_NAME = "María Isabel V."

export function ManagerContextBar({ hotelId }: ManagerContextBarProps) {
  const [dateLabel, setDateLabel] = useState<string>("")

  useEffect(() => {
    const now = new Date()
    const day = DAY_NAMES[now.getDay()]
    const date = now.getDate()
    const month = MONTH_NAMES[now.getMonth()]
    const year = now.getFullYear()
    setDateLabel(`${day} ${date} de ${month} de ${year}`)
  }, [])

  return (
    <div
      className="w-full flex items-center justify-between px-6 py-3 border-b"
      style={{
        backgroundColor: "#ffffff",
        borderColor: "#E5E7EB",
      }}
    >
      {/* Left: Hotel name */}
      <div className="flex items-center gap-2">
        <Building2 size={18} style={{ color: "#FFC43D" }} />
        <span
          className="text-lg font-bold tracking-tight"
          style={{ color: "#ffffff" }}
        >
          {MOCK_HOTEL_NAME}
        </span>
        <span
          className="text-xs font-normal px-2 py-0.5 rounded-full ml-1"
          style={{ backgroundColor: "#F3F4F6", color: "#6B7280" }}
        >
          ID {hotelId}
        </span>
      </div>

      {/* Right: Manager name + date */}
      <div className="flex items-center gap-5">
        {/* Date */}
        <div className="hidden sm:flex items-center gap-1.5">
          <CalendarDays size={15} style={{ color: "#9CA3AF" }} />
          <span className="text-sm" style={{ color: "#6B7280" }}>
            {dateLabel}
          </span>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-5" style={{ backgroundColor: "#E5E7EB" }} />

        {/* Manager */}
        <div className="flex items-center gap-1.5">
          <UserCircle size={18} style={{ color: "#1a3a5c" }} />
          <span className="text-sm font-semibold" style={{ color: "#1a3a5c" }}>
            {MOCK_MANAGER_NAME}
          </span>
        </div>
      </div>
    </div>
  )
}
