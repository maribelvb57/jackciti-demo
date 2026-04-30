"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface DayData {
  date: number
  booked: number      // comes from backend – not editable
  capacity: number    // editable by the user
  dispo: number       // comes from backend – not editable
}

interface CalendarState {
  year: number
  month: number // 0-indexed
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const MONTH_NAMES_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
]

const DAY_NAMES_ES = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

/** Returns day-of-week index for the 1st of the month where Monday = 0 */
function firstDayOfMonth(year: number, month: number): number {
  const jsDay = new Date(year, month, 1).getDay() // 0 = Sunday
  return jsDay === 0 ? 6 : jsDay - 1              // convert to Mon=0 … Sun=6
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

/** Build mock data for every day in the month (deterministic to avoid hydration mismatch) */
function buildMonthData(year: number, month: number): Record<number, DayData> {
  const total = daysInMonth(year, month)
  const data: Record<number, DayData> = {}
  for (let d = 1; d <= total; d++) {
    // Deterministic "booked" value based on day, month, year (avoids random hydration mismatch)
    const booked = (d + month + (year % 10)) % 9
    const capacity = 10
    data[d] = { date: d, booked, capacity, dispo: capacity - booked }
  }
  return data
}

// ─── Day Cell ─────────────────────────────────────────────────────────────────

interface DayCellProps {
  day: number | null
  data: DayData | undefined
  onCapacityChange: (day: number, value: string) => void
}

function DayCell({ day, data, onCapacityChange }: DayCellProps) {
  // Empty/shaded cell (outside the current month)
  if (day === null) {
    return (
      <td
        className="border border-gray-300 bg-gray-100 relative"
        style={{ minHeight: 96, height: 96 }}
        aria-hidden="true"
      >
        {/* diagonal hatch pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #d1d5db 0px, #d1d5db 1px, transparent 1px, transparent 8px)",
          }}
        />
      </td>
    )
  }

  return (
    <td
      className="border border-gray-300 bg-white relative p-1 align-top"
      style={{ minHeight: 96, height: 96, width: "14.28%" }}
    >
      {/* Date label – top right */}
      <div
        className="absolute top-0 right-0 min-w-[28px] h-7 flex items-center justify-center rounded-bl text-xs font-bold px-1.5"
        style={{ backgroundColor: "#4A90E2", color: "#ffffff" }}
      >
        {day}
      </div>

      {/* Booked / Capacity row */}
      <div className="flex items-center justify-center gap-0.5 mt-5">
        {/* booked – read only */}
        <span className="text-lg font-bold" style={{ color: "#0D2B45" }}>
          {data?.booked ?? "-"}
        </span>
        <span className="text-lg font-bold" style={{ color: "#0D2B45" }}>/</span>
        {/* capacity – editable */}
        <input
          type="number"
          min={0}
          max={99}
          value={data?.capacity ?? ""}
          onChange={(e) => onCapacityChange(day, e.target.value)}
          className="w-9 text-center text-sm font-bold border border-gray-400 rounded focus:outline-none focus:ring-1"
          style={{
            color: "#0D2B45",
            backgroundColor: "#FFFDE7",
            ringColor: "#FFC43D",
          }}
          aria-label={`Capacidad día ${day}`}
        />
      </div>

      {/* Dispo label – bottom */}
      <div className="flex justify-center mt-1.5">
        <span className="text-xs" style={{ color: "#4B5563" }}>
          dispo:{" "}
          <span className="font-semibold" style={{ color: "#0D2B45" }}>
            {data?.dispo ?? "-"}
          </span>
        </span>
      </div>
    </td>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface AvailabilityCalendarProps {
  hotelId: string
}

export function AvailabilityCalendar({ hotelId }: AvailabilityCalendarProps) {
  const today = new Date()
  const [cal, setCal] = useState<CalendarState>({ year: today.getFullYear(), month: today.getMonth() })
  const [dayData, setDayData] = useState<Record<number, DayData>>(() => buildMonthData(cal.year, cal.month))
  const [bulkCapacity, setBulkCapacity] = useState<string>("10")

  // Navigation
  function prevMonth() {
    setCal((prev) => {
      const d = new Date(prev.year, prev.month - 1, 1)
      const next = { year: d.getFullYear(), month: d.getMonth() }
      setDayData(buildMonthData(next.year, next.month))
      return next
    })
  }

  function nextMonth() {
    setCal((prev) => {
      const d = new Date(prev.year, prev.month + 1, 1)
      const next = { year: d.getFullYear(), month: d.getMonth() }
      setDayData(buildMonthData(next.year, next.month))
      return next
    })
  }

  // Capacity edit
  function handleCapacityChange(day: number, value: string) {
    const parsed = parseInt(value, 10)
    const capacity = isNaN(parsed) ? 0 : Math.max(0, Math.min(99, parsed))
    setDayData((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        capacity,
        dispo: capacity - (prev[day]?.booked ?? 0),
      },
    }))
  }

  // Bulk update
  function handleBulkUpdate() {
    const newCap = parseInt(bulkCapacity, 10)
    if (isNaN(newCap)) return
    const todayDate = today.getDate()
    const isCurrentMonth = cal.year === today.getFullYear() && cal.month === today.getMonth()
    setDayData((prev) => {
      const updated = { ...prev }
      Object.keys(updated).forEach((k) => {
        const d = parseInt(k, 10)
        if (!isCurrentMonth || d >= todayDate) {
          updated[d] = {
            ...updated[d],
            capacity: newCap,
            dispo: newCap - updated[d].booked,
          }
        }
      })
      return updated
    })
  }

  // Build calendar grid (6 rows × 7 cols)
  const firstDay = firstDayOfMonth(cal.year, cal.month)
  const totalDays = daysInMonth(cal.year, cal.month)

  // Flatten into 42 slots (6 weeks)
  const slots: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) slots.push(null)
  for (let d = 1; d <= totalDays; d++) slots.push(d)
  while (slots.length < 42) slots.push(null)

  const weeks: (number | null)[][] = []
  for (let w = 0; w < 6; w++) {
    weeks.push(slots.slice(w * 7, w * 7 + 7))
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 font-sans">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-gray-100"
          style={{ color: "#0D2B45" }}
          aria-label="Mes anterior"
        >
          <ChevronLeft size={28} strokeWidth={2.5} />
        </button>

        <h1 className="text-3xl font-bold uppercase tracking-wider" style={{ color: "#0D2B45" }}>
          {MONTH_NAMES_ES[cal.month]} {cal.year}
        </h1>

        <button
          onClick={nextMonth}
          className="flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-gray-100"
          style={{ color: "#0D2B45" }}
          aria-label="Mes siguiente"
        >
          <ChevronRight size={28} strokeWidth={2.5} />
        </button>
      </div>

      {/* Calendar table */}
      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr>
              {DAY_NAMES_ES.map((name) => (
                <th
                  key={name}
                  className="border border-gray-300 py-2 text-center text-sm font-semibold"
                  style={{ backgroundColor: "#0D2B45", color: "#ffffff", width: "14.28%" }}
                >
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, wi) => (
              <tr key={wi}>
                {week.map((day, di) => (
                  <DayCell
                    key={`${wi}-${di}`}
                    day={day}
                    data={day !== null ? dayData[day] : undefined}
                    onCapacityChange={handleCapacityChange}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bulk update footer */}
      <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <span className="text-sm" style={{ color: "#4B5563" }}>
          Actualizar todas las disponibilidades futuras a
        </span>
        <input
          type="number"
          min={0}
          max={99}
          value={bulkCapacity}
          onChange={(e) => setBulkCapacity(e.target.value)}
          className="w-16 text-center text-sm font-bold border-2 border-gray-400 rounded focus:outline-none focus:ring-2 py-1"
          style={{ color: "#0D2B45", ringColor: "#FFC43D" }}
          aria-label="Capacidad masiva"
        />
        <button
          onClick={handleBulkUpdate}
          className="px-5 py-1.5 rounded text-sm font-bold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#FFC43D", color: "#0D2B45" }}
        >
          Go!
        </button>
      </div>

      {/* Hotel ID note */}
      <p className="text-xs text-right mt-2" style={{ color: "#9CA3AF" }}>
        Hotel ID: {hotelId}
      </p>
    </div>
  )
}
