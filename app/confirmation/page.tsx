"use client"

import { useState } from "react"
import Image from "next/image"
import { SiteNavbar } from "@/components/site-navbar"
import { 
  User,
  Mail,
  Phone,
  MapPin,
  PawPrint,
  AlertCircle,
  ChevronDown,
  Minus,
  Plus,
  Check
} from "lucide-react"

// Mock hotel data
const HOTEL_DATA = {
  name: "Cherratón Miramar",
  location: "Vitacura",
  image: "/images/hotel-patitas-inn.jpg",
  conditions: [
    "No recibe perros sin vacunas al día",
    "No recibe perros en celo",
    "Requiere certificado de desparasitación",
  ],
  cancellationPolicy: "Cancelación gratuita hasta 48 horas antes del check-in. Después de ese plazo se cobra el 50% de la reserva.",
}

// Mock reservation data
const RESERVATION_DATA = {
  petCount: 2,
  petSize: "Tamaño pequeño",
  nights: 2,
  dateFrom: "7 mayo",
  dateTo: "9 mayo",
  withTransport: true,
  transportFrom: "Comuna Macul",
  pricePerNight: 85000,
  transportPrice: 15000,
}

// Country codes for phone
const COUNTRY_CODES = [
  { code: "+56", country: "CL", flag: "🇨🇱" },
  { code: "+54", country: "AR", flag: "🇦🇷" },
  { code: "+51", country: "PE", flag: "🇵🇪" },
  { code: "+57", country: "CO", flag: "🇨🇴" },
  { code: "+52", country: "MX", flag: "🇲🇽" },
]

// Countries list
const COUNTRIES = ["Chile", "Argentina", "Perú", "Colombia", "México", "Brasil", "Ecuador"]

// Cities by country (simplified)
const CITIES: Record<string, string[]> = {
  Chile: ["Santiago", "Valparaíso", "Concepción", "Viña del Mar", "Antofagasta"],
  Argentina: ["Buenos Aires", "Córdoba", "Rosario", "Mendoza"],
  Perú: ["Lima", "Arequipa", "Cusco", "Trujillo"],
  Colombia: ["Bogotá", "Medellín", "Cali", "Barranquilla"],
  México: ["Ciudad de México", "Guadalajara", "Monterrey", "Puebla"],
  Brasil: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
  Ecuador: ["Quito", "Guayaquil", "Cuenca"],
}

// Pet sizes
const PET_SIZES = ["Pequeño", "Mediano", "Grande"]

// Pet colors
const PET_COLORS = ["Negro", "Blanco", "Marrón", "Dorado", "Gris", "Manchado", "Otro"]

interface PetData {
  name: string
  breed: string
  size: string
  color: string
  age: number
}

export default function BookingConfirmationPage() {
  // User form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [country, setCountry] = useState("Chile")
  const [city, setCity] = useState("")
  const [countryCode, setCountryCode] = useState("+56")
  const [phone, setPhone] = useState("")

  // Pets state
  const [pets, setPets] = useState<PetData[]>([
    { name: "", breed: "", size: "Pequeño", color: "", age: 1 },
    { name: "", breed: "", size: "Pequeño", color: "", age: 1 },
  ])

  // Conditions checkboxes
  const [vaccinesUpToDate, setVaccinesUpToDate] = useState(false)
  const [isCastrated, setIsCastrated] = useState(false)
  const [notInHeat, setNotInHeat] = useState(false)

  const hotel = HOTEL_DATA
  const reservation = RESERVATION_DATA

  const basePrice = reservation.pricePerNight * reservation.nights
  const transportPrice = reservation.withTransport ? reservation.transportPrice : 0
  const totalPrice = basePrice + transportPrice

  const updatePet = (index: number, field: keyof PetData, value: string | number) => {
    const newPets = [...pets]
    newPets[index] = { ...newPets[index], [field]: value }
    setPets(newPets)
  }

  const incrementAge = (index: number) => {
    const newPets = [...pets]
    newPets[index].age = Math.min(newPets[index].age + 1, 25)
    setPets(newPets)
  }

  const decrementAge = (index: number) => {
    const newPets = [...pets]
    newPets[index].age = Math.max(newPets[index].age - 1, 0)
    setPets(newPets)
  }

  const allConditionsAccepted = vaccinesUpToDate && isCastrated && notInHeat

  return (
    <main className="min-h-screen flex flex-col items-center" style={{ backgroundColor: "#0B1F3A" }}>
      <div className="w-full max-w-[1200px] flex flex-col" style={{ backgroundColor: "#ffffff" }}>
        {/* Top navigation */}
        <SiteNavbar />

        {/* Main content */}
        <div className="w-full px-4 pb-4 md:px-6 md:pb-6 pt-4">
          {/* Two column layout - reversed: 25% left, 75% right */}
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Left column - 25% (info cards) */}
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

              {/* Reservation summary (left column) */}
              <div className="bg-white rounded-2xl p-4 border" style={{ borderColor: "#E5E7EB" }}>
                <h3 className="font-bold text-sm mb-3" style={{ color: "#0A1830" }}>Resumen Reserva</h3>
                <ul className="flex flex-col gap-1.5 text-xs" style={{ color: "#555" }}>
                  <li>{reservation.petCount} mascotas, {reservation.petSize}</li>
                  <li>{reservation.nights} noches ({reservation.dateFrom} - {reservation.dateTo})</li>
                  {reservation.withTransport && <li>Transporte incluido</li>}
                </ul>
              </div>

              {/* Hotel conditions */}
              <div className="bg-white rounded-2xl p-4 border" style={{ borderColor: "#E5E7EB" }}>
                <h3 className="font-bold text-sm mb-3" style={{ color: "#0A1830" }}>Condiciones del Hotel</h3>
                <ul className="flex flex-col gap-2">
                  {hotel.conditions.map((condition, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs" style={{ color: "#555" }}>
                      <AlertCircle size={14} style={{ color: "#F59E0B", flexShrink: 0, marginTop: 1 }} />
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cancellation policy */}
              <div className="bg-white rounded-2xl p-4 border" style={{ borderColor: "#E5E7EB" }}>
                <h3 className="font-bold text-sm mb-3" style={{ color: "#0A1830" }}>Política de Cancelación</h3>
                <p className="text-xs leading-relaxed" style={{ color: "#555" }}>
                  {hotel.cancellationPolicy}
                </p>
              </div>
            </div>

            {/* Right column - 75% (forms) */}
            <div className="flex flex-col gap-4 lg:w-3/4 order-2 lg:order-2">

              {/* Page title */}
              <h1 className="text-2xl md:text-3xl font-bold mt-6" style={{ color: "#0A1830" }}>
                Confirmación de Reserva
              </h1>

              {/* Login button */}
              <button
                className="w-full sm:w-auto self-start flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm border-2 transition-colors hover:bg-gray-50"
                style={{ borderColor: "#0A1830", color: "#0A1830" }}
              >
                <User size={16} />
                Inicia Sesión
              </button>

              {/* User data form */}
              <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: "#E5E7EB" }}>
                <h2 className="text-lg font-bold mb-4" style={{ color: "#0A1830" }}>
                  O completa tus datos:
                </h2>
                
                <div className="flex flex-col gap-4">
                  {/* Name row */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0A1830" }}>
                        Nombre Tutor
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2"
                          style={{ borderColor: "#E5E7EB", color: "#0A1830" }}
                          placeholder="Nombre"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0A1830" }}>
                        Apellidos
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2"
                        style={{ borderColor: "#E5E7EB", color: "#0A1830" }}
                        placeholder="Apellidos"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0A1830" }}>
                      Email
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2"
                        style={{ borderColor: "#E5E7EB", color: "#0A1830" }}
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                  </div>

                  {/* Country and City */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0A1830" }}>
                        País
                      </label>
                      <div className="relative">
                        <select
                          value={country}
                          onChange={(e) => {
                            setCountry(e.target.value)
                            setCity("")
                          }}
                          className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 appearance-none cursor-pointer"
                          style={{ borderColor: "#E5E7EB", color: "#0A1830" }}
                        >
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9CA3AF" }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0A1830" }}>
                        Ciudad
                      </label>
                      <div className="relative">
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 appearance-none cursor-pointer"
                          style={{ borderColor: "#E5E7EB", color: "#0A1830" }}
                        >
                          <option value="">Seleccionar ciudad</option>
                          {(CITIES[country] || []).map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9CA3AF" }} />
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0A1830" }}>
                      Teléfono
                    </label>
                    <div className="flex gap-2">
                      <div className="relative w-24">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="w-full pl-9 pr-2 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 appearance-none cursor-pointer"
                          style={{ borderColor: "#E5E7EB", color: "#0A1830" }}
                        >
                          {COUNTRY_CODES.map((cc) => (
                            <option key={cc.code} value={cc.code}>{cc.code}</option>
                          ))}
                        </select>
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2"
                        style={{ borderColor: "#E5E7EB", color: "#0A1830" }}
                        placeholder="940302010"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pets form */}
              <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: "#E5E7EB" }}>
                <h2 className="text-lg font-bold mb-4" style={{ color: "#0A1830" }}>
                  <PawPrint size={20} className="inline-block mr-2" style={{ color: "#0A1830" }} />
                  Mi(s) Mascota(s)
                </h2>

                <div className="flex flex-col gap-6">
                  {pets.map((pet, index) => (
                    <div key={index} className="flex flex-col gap-3">
                      {pets.length > 1 && (
                        <p className="text-xs font-semibold" style={{ color: "#6B7280" }}>
                          Mascota {index + 1}
                        </p>
                      )}
                      
                      {/* Name, Breed, Size row */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                          <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0A1830" }}>
                            Nombre
                          </label>
                          <input
                            type="text"
                            value={pet.name}
                            onChange={(e) => updatePet(index, "name", e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2"
                            style={{ borderColor: "#E5E7EB", color: "#0A1830" }}
                            placeholder="Nombre mascota"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0A1830" }}>
                            Raza
                          </label>
                          <input
                            type="text"
                            value={pet.breed}
                            onChange={(e) => updatePet(index, "breed", e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2"
                            style={{ borderColor: "#E5E7EB", color: "#0A1830" }}
                            placeholder="Raza"
                          />
                        </div>
                        <div className="w-full sm:w-32">
                          <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0A1830" }}>
                            Tamaño
                          </label>
                          <div className="relative">
                            <select
                              value={pet.size}
                              onChange={(e) => updatePet(index, "size", e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 appearance-none cursor-pointer"
                              style={{ borderColor: "#E5E7EB", color: "#0A1830" }}
                            >
                              {PET_SIZES.map((size) => (
                                <option key={size} value={size}>{size}</option>
                              ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9CA3AF" }} />
                          </div>
                        </div>
                      </div>

                      {/* Color, Age row */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                          <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0A1830" }}>
                            Color
                          </label>
                          <div className="relative">
                            <select
                              value={pet.color}
                              onChange={(e) => updatePet(index, "color", e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 appearance-none cursor-pointer"
                              style={{ borderColor: "#E5E7EB", color: "#0A1830" }}
                            >
                              <option value="">Seleccionar color</option>
                              {PET_COLORS.map((color) => (
                                <option key={color} value={color}>{color}</option>
                              ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9CA3AF" }} />
                          </div>
                        </div>
                        <div className="w-full sm:w-40">
                          <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0A1830" }}>
                            Edad (años)
                          </label>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => decrementAge(index)}
                              className="w-10 h-10 flex items-center justify-center rounded-xl border transition-colors hover:bg-gray-50"
                              style={{ borderColor: "#E5E7EB" }}
                            >
                              <Minus size={16} style={{ color: "#0A1830" }} />
                            </button>
                            <div 
                              className="flex-1 h-10 flex items-center justify-center rounded-xl border text-sm font-semibold"
                              style={{ borderColor: "#E5E7EB", color: "#0A1830" }}
                            >
                              {pet.age}
                            </div>
                            <button
                              type="button"
                              onClick={() => incrementAge(index)}
                              className="w-10 h-10 flex items-center justify-center rounded-xl border transition-colors hover:bg-gray-50"
                              style={{ borderColor: "#E5E7EB" }}
                            >
                              <Plus size={16} style={{ color: "#0A1830" }} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {index < pets.length - 1 && (
                        <hr className="mt-3" style={{ borderColor: "#E5E7EB" }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirm conditions */}
              <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: "#E5E7EB" }}>
                <h2 className="text-lg font-bold mb-4" style={{ color: "#0A1830" }}>
                  Confirmar Condiciones
                </h2>

                <div className="flex flex-col gap-3">
                  {/* Vaccines checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div
                      className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
                      style={{ 
                        borderColor: vaccinesUpToDate ? "#FFC43D" : "#D1D5DB",
                        backgroundColor: vaccinesUpToDate ? "#FFC43D" : "transparent"
                      }}
                      onClick={() => setVaccinesUpToDate(!vaccinesUpToDate)}
                    >
                      {vaccinesUpToDate && <Check size={14} style={{ color: "#0A1830" }} strokeWidth={3} />}
                    </div>
                    <span className="text-sm" style={{ color: "#333" }}>
                      Mis mascotas tienen sus vacunas al día
                    </span>
                  </label>

                  {/* Castrated checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div
                      className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
                      style={{ 
                        borderColor: isCastrated ? "#FFC43D" : "#D1D5DB",
                        backgroundColor: isCastrated ? "#FFC43D" : "transparent"
                      }}
                      onClick={() => setIsCastrated(!isCastrated)}
                    >
                      {isCastrated && <Check size={14} style={{ color: "#0A1830" }} strokeWidth={3} />}
                    </div>
                    <span className="text-sm" style={{ color: "#333" }}>
                      Mi mascota está castrada
                    </span>
                  </label>

                  {/* Not in heat checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div
                      className="w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
                      style={{ 
                        borderColor: notInHeat ? "#FFC43D" : "#D1D5DB",
                        backgroundColor: notInHeat ? "#FFC43D" : "transparent"
                      }}
                      onClick={() => setNotInHeat(!notInHeat)}
                    >
                      {notInHeat && <Check size={14} style={{ color: "#0A1830" }} strokeWidth={3} />}
                    </div>
                    <span className="text-sm" style={{ color: "#333" }}>
                      Mi mascota no está en celo
                    </span>
                  </label>
                </div>
              </div>

              {/* Reservation summary and pay button */}
              <div className="bg-white rounded-2xl p-5 border" style={{ borderColor: "#E5E7EB" }}>
                <h2 className="text-lg font-bold mb-3" style={{ color: "#0A1830" }}>
                  Resumen Reserva
                </h2>

                <ul className="flex flex-col gap-1.5 text-sm mb-4" style={{ color: "#555" }}>
                  <li>{reservation.petCount} mascotas {reservation.petSize.toLowerCase()}</li>
                  <li>{reservation.nights} noches ({reservation.dateFrom} - {reservation.dateTo})</li>
                  {reservation.withTransport && (
                    <li>Transporte incluido desde {reservation.transportFrom}</li>
                  )}
                </ul>

                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pt-4 border-t" style={{ borderColor: "#E5E7EB" }}>
                  <div>
                    <p className="text-3xl md:text-4xl font-bold" style={{ color: "#0A1830" }}>
                      ${totalPrice.toLocaleString("es-CL")}
                    </p>
                    <p className="text-xs" style={{ color: "#888" }}>IVA incluido</p>
                  </div>

                  <button
                    disabled={!allConditionsAccepted}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-base transition-opacity disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                    style={{ backgroundColor: "#FFC43D", color: "#0A1830" }}
                  >
                    Ir a Pagar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
