"use client"

import Image from "next/image"
import { SiteNavbar } from "@/components/site-navbar"
import { MapPin, Clock, Calendar, AlertCircle } from "lucide-react"

// Mock hotel data
const HOTEL_DATA = {
  name: "Cherratón Miramar",
  location: "Vitacura",
  image: "/images/hotel-patitas-inn.jpg",
}

// Mock reservation data
const RESERVATION_DATA = {
  petNames: ["Bruno", "Lola"],
  petCount: 2,
  nights: 2,
  dateFrom: "7 de Mayo",
  dateTo: "9 de Mayo",
  withTransport: true,
  pickupTime: "9 y 12m",
  pickupDate: "7 de Mayo",
  freeCancellationDate: "4 de Mayo",
  totalPrice: 207000,
}

export default function PaymentSuccessPage() {
  const hotel = HOTEL_DATA
  const reservation = RESERVATION_DATA

  const petNamesFormatted = reservation.petNames.length > 1
    ? `${reservation.petNames.slice(0, -1).join(", ")} y ${reservation.petNames[reservation.petNames.length - 1]}`
    : reservation.petNames[0]

  return (
    <main className="min-h-screen flex flex-col items-center" style={{ backgroundColor: "#0B1F3A" }}>
      <div className="w-full max-w-[1200px] flex flex-col" style={{ backgroundColor: "#ffffff" }}>
        {/* Top navigation */}
        <SiteNavbar />

        {/* Main content */}
        <div className="w-full px-4 pb-6 md:px-6 md:pb-8 pt-4">
          {/* Two column layout - 25% left, 75% right */}
          <div className="flex flex-col lg:flex-row gap-6">
            
            {/* Left column - 25% (hotel photo) */}
            <div className="flex flex-col gap-4 lg:w-1/4 order-1 lg:order-1">
              
              {/* Hotel photo */}
              <div className="bg-white rounded-2xl overflow-hidden border" style={{ borderColor: "#E5E7EB" }}>
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm" style={{ color: "#0A1830" }}>{hotel.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={12} style={{ color: "#6B7280" }} />
                    <span className="text-xs" style={{ color: "#6B7280" }}>{hotel.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - 75% (success content) */}
            <div className="flex flex-col gap-2 lg:w-3/4 order-2 lg:order-2">

              {/* Success message with Jack */}
              <div className="flex flex-col sm:flex-row items-center gap-2 py-0">
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold mb-0" style={{ color: "#0A1830" }}>
                    Felicitaciones!
                  </h1>
                  <p className="text-lg md:text-xl" style={{ color: "#555" }}>
                    Ya esta lista la reserva para tu peque
                  </p>
                </div>
                <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex-shrink-0">
                  <Image
                    src="/images/jack-reserva-exitosa.jpg"
                    alt="Jack celebrando"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Reservation data card */}
              <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: "#E5E7EB" }}>
                <h2 className="text-lg font-bold mb-4" style={{ color: "#0A1830" }}>
                  Datos de la Reserva
                </h2>
                
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <ul className="flex flex-col gap-2 text-sm" style={{ color: "#333" }}>
                    <li className="flex items-center gap-2">
                      <span>{reservation.petCount} mascotas ({petNamesFormatted})</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Calendar size={16} style={{ color: "#0A1830" }} />
                      <span>{reservation.nights} Noches ({reservation.dateFrom} al {reservation.dateTo})</span>
                    </li>
                    {reservation.withTransport && (
                      <li className="flex items-center gap-2">
                        <span>Transporte Incluido</span>
                      </li>
                    )}
                  </ul>
                  
                  <div className="flex flex-col sm:items-end">
                    <p className="text-3xl md:text-4xl font-bold" style={{ color: "#0A1830" }}>
                      ${reservation.totalPrice.toLocaleString("es-CL")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reminder card */}
              <div 
                className="rounded-2xl p-5 border-2"
                style={{ backgroundColor: "#FEF9E7", borderColor: "#FFC43D" }}
              >
                <h2 className="text-lg font-bold mb-3" style={{ color: "#0A1830" }}>
                  Recuerda!
                </h2>
                
                <div className="flex flex-col gap-2 text-sm" style={{ color: "#333" }}>
                  <p>
                    Pasaremos a buscar a <strong>{petNamesFormatted}</strong> el <strong>{reservation.pickupDate}</strong>
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock size={16} style={{ color: "#0A1830" }} />
                    <span>entre {reservation.pickupTime}.</span>
                  </div>
                  <p className="mt-1" style={{ color: "#555" }}>
                    Coordinaremos detalles por anticipacion.
                  </p>
                </div>
              </div>

              {/* Cancellation policy card */}
              <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: "#E5E7EB" }}>
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} style={{ color: "#F59E0B", flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <p className="text-sm leading-relaxed" style={{ color: "#333" }}>
                      La cancelacion de esta reserva la puedes realizar sin costo hasta el <strong>{reservation.freeCancellationDate}</strong>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
