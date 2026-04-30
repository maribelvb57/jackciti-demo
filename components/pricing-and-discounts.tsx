"use client"

import { useState } from "react"
import { Edit2, Check, X } from "lucide-react"

interface RoomType {
  id: string
  name: string
  price: number
}

interface PricingData {
  roomTypes: RoomType[]
  discountPercentage: number
}

export function PricingAndDiscounts({ hotelId }: { hotelId: string }) {
  const [data, setData] = useState<PricingData>({
    roomTypes: [
      { id: "small", name: "Pequeño", price: 12000 },
      { id: "medium", name: "Mediano", price: 15000 },
      { id: "large", name: "Grande", price: 20000 },
      { id: "extra-large", name: "Extra grande", price: 23000 },
    ],
    discountPercentage: 5,
  })

  const [editingField, setEditingField] = useState<string | null>(null)
  const [editingValue, setEditingValue] = useState<string>("")

  function startEdit(fieldId: string, currentValue: string | number) {
    setEditingField(fieldId)
    setEditingValue(String(currentValue))
  }

  function saveEdit(fieldId: string) {
    if (!editingValue) return

    if (fieldId.startsWith("room-")) {
      const roomId = fieldId.replace("room-", "")
      const newPrice = parseInt(editingValue, 10)
      setData((prev) => ({
        ...prev,
        roomTypes: prev.roomTypes.map((room) =>
          room.id === roomId ? { ...room, price: newPrice } : room
        ),
      }))
    } else if (fieldId === "discount") {
      const newDiscount = parseFloat(editingValue)
      setData((prev) => ({
        ...prev,
        discountPercentage: newDiscount,
      }))
    }

    setEditingField(null)
    setEditingValue("")
  }

  function cancelEdit() {
    setEditingField(null)
    setEditingValue("")
  }

  function formatPrice(price: number): string {
    return `$${price.toLocaleString()}`
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 font-sans">
      {/* Precios por Noche */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-1" style={{ color: "#1a3a5c" }}>
          Precios
        </h2>
        <p className="text-sm mb-6" style={{ color: "#4B5563" }}>
          por Noche
        </p>

        <div className="space-y-4">
          {data.roomTypes.map((room) => {
            const isEditing = editingField === `room-${room.id}`
            return (
              <div
                key={room.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow"
              >
                <label className="text-sm font-medium flex-1" style={{ color: "#1a3a5c" }}>
                  {room.name}
                </label>

                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <input
                        type="number"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        className="w-32 px-3 py-2 text-sm border-2 border-blue-400 rounded focus:outline-none"
                        style={{ borderColor: "#FFC43D" }}
                        autoFocus
                      />
                      <button
                        onClick={() => saveEdit(`room-${room.id}`)}
                        className="p-1.5 rounded hover:bg-green-100 transition-colors"
                        title="Guardar"
                      >
                        <Check size={18} style={{ color: "rgb(34 197 94)" }} />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-1.5 rounded hover:bg-red-100 transition-colors"
                        title="Cancelar"
                      >
                        <X size={18} style={{ color: "rgb(239 68 68)" }} />
                      </button>
                    </>
                  ) : (
                    <>
                      <span
                        className="w-32 text-right font-semibold"
                        style={{ color: "#1a3a5c" }}
                      >
                        {formatPrice(room.price)}
                      </span>
                      <button
                        onClick={() => startEdit(`room-${room.id}`, room.price)}
                        className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                        title="Editar"
                      >
                        <Edit2 size={18} style={{ color: "#1a3a5c" }} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Descuentos */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: "#1a3a5c" }}>
          Descuento
        </h2>

        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition-shadow">
          <label className="text-sm font-medium flex-1" style={{ color: "#1a3a5c" }}>
            Descuento por una semana o más
          </label>

          <div className="flex items-center gap-2">
            {editingField === "discount" ? (
              <>
                <input
                  type="number"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  className="w-20 px-3 py-2 text-sm border-2 rounded focus:outline-none"
                  style={{ borderColor: "#FFC43D" }}
                  autoFocus
                />
                <span style={{ color: "#4B5563" }} className="text-sm">
                  %
                </span>
                <button
                  onClick={() => saveEdit("discount")}
                  className="p-1.5 rounded hover:bg-green-100 transition-colors"
                  title="Guardar"
                >
                  <Check size={18} style={{ color: "rgb(34 197 94)" }} />
                </button>
                <button
                  onClick={cancelEdit}
                  className="p-1.5 rounded hover:bg-red-100 transition-colors"
                  title="Cancelar"
                >
                  <X size={18} style={{ color: "rgb(239 68 68)" }} />
                </button>
              </>
            ) : (
              <>
                <span
                  className="w-20 text-right font-semibold"
                  style={{ color: "#1a3a5c" }}
                >
                  {data.discountPercentage}%
                </span>
                <button
                  onClick={() => startEdit("discount", data.discountPercentage)}
                  className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                  title="Editar"
                >
                  <Edit2 size={18} style={{ color: "#1a3a5c" }} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-center">
        <button
          className="px-10 py-3 rounded-lg text-base font-bold tracking-wide transition-opacity hover:opacity-90 shadow-sm"
          style={{ backgroundColor: "#FFC43D", color: "#0D2B45" }}
          onClick={() => {
            // TODO: connect to backend save logic
          }}
        >
          Guardar cambios
        </button>
      </div>
    </div>
  )
}
