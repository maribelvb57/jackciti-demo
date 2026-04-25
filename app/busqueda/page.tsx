"use client"

import { useState } from "react"
import { SiteNavbar } from "@/components/site-navbar"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ResultCard, type ResultCardData } from "@/components/result-card"
import { SearchFilters } from "@/components/search-filters"

const MOCK_RESULTS: ResultCardData[] = [
  {
    name: "Hotel Boutique Patitas Inn",
    score: 9.0,
    scoreLabel: "Fantástico",
    reviewCount: 181,
    address: "Valenzuela Palma, La Reina",
    features: ["Libre de Jaulas", "Amplio espacio al aire libre", "Veterinario on site"],
    freeCancellation: true,
    petCount: 2,
    nights: 5,
    price: 178000,
    imageUrl: "/images/hotel-patitas-inn.jpg",
  },
  {
    name: "Hostal Huellitas",
    score: 8.5,
    scoreLabel: "Muy bueno",
    reviewCount: 94,
    address: "Av. Apoquindo, Las Condes",
    features: ["Jardín privado", "Paseos diarios incluidos", "Cámaras 24/7"],
    freeCancellation: false,
    petCount: 1,
    nights: 3,
    price: 89000,
    imageUrl: "/images/hotel-huellitas.jpg",
  },
  {
    name: "Pet Lodge Santiago Centro",
    score: 7.8,
    scoreLabel: "Bueno",
    reviewCount: 42,
    address: "Santo Domingo, Santiago",
    features: ["Jaula opcional", "Zona de juegos interior"],
    freeCancellation: true,
    petCount: 1,
    nights: 2,
    price: 54000,
    imageUrl: "/images/hotel-pet-lodge.jpg",
  },
  {
    name: "Casa Canina Providencia",
    score: 9.3,
    scoreLabel: "Excepcional",
    reviewCount: 230,
    address: "Manuel Montt, Providencia",
    features: ["Libre de Jaulas", "Piscina para perros", "Chef especializado en nutrición"],
    freeCancellation: true,
    petCount: 2,
    nights: 4,
    price: 220000,
    imageUrl: "/images/hotel-casa-canina.jpg",
  },
  {
    name: "Paws & Rest Ñuñoa",
    score: 8.1,
    scoreLabel: "Muy bueno",
    reviewCount: 67,
    address: "Irarrázaval, Ñuñoa",
    features: ["Amplio patio", "Cuidador nocturno", "Baño y secado incluido"],
    freeCancellation: false,
    petCount: 1,
    nights: 5,
    price: 112000,
    imageUrl: "/images/hotel-paws-rest.jpg",
  },
  {
    name: "Retiro Peludo Vitacura",
    score: 9.1,
    scoreLabel: "Fantástico",
    reviewCount: 158,
    address: "Av. Vitacura, Vitacura",
    features: ["Libre de Jaulas", "Veterinario on site", "Servicio de transporte"],
    freeCancellation: true,
    petCount: 3,
    nights: 7,
    price: 345000,
    imageUrl: "/images/hotel-patitas-inn.jpg",
  },
  {
    name: "El Refugio de Firulais",
    score: 8.7,
    scoreLabel: "Fantástico",
    reviewCount: 113,
    address: "Los Dominicos, Las Condes",
    features: ["Zona rural", "Libre de Jaulas", "Supervisión permanente"],
    freeCancellation: true,
    petCount: 2,
    nights: 3,
    price: 134000,
    imageUrl: "/images/hotel-patitas-inn.jpg",
  },
]

export default function BusquedaPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: "#0B1F3A" }}>
      {/* Top navigation */}
      <SiteNavbar />

      {/* Main content area */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-[1200px] flex flex-col md:flex-row" style={{ backgroundColor: "#F3F4F6" }}>

          {/* MOBILE: Horizontal filter strip */}
          <div
            className="md:hidden flex items-center gap-2 px-4 py-3 overflow-x-auto border-b flex-shrink-0"
            style={{ backgroundColor: "var(--filter-bg)", borderColor: "var(--filter-border)" }}
          >
            <span className="text-xs font-semibold flex-shrink-0 mr-1" style={{ color: "#0A1830" }}>
              Filtros:
            </span>
            {["Libre de Jaulas", "Cancelación gratis", "Veterinario", "Patio exterior", "Calificación 8+"].map((f) => (
              <button
                key={f}
                className="flex-shrink-0 px-3 py-1.5 rounded-full border text-xs font-medium transition-colors"
                style={{ borderColor: "#22c55e", color: "#0A1830", backgroundColor: "#fff" }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* DESKTOP: Left sidebar - Filters */}
          <aside
            className="hidden md:block relative flex-shrink-0 transition-all duration-300 ease-in-out border-r"
            style={{
              width: sidebarOpen ? 300 : 0,
              backgroundColor: "var(--filter-bg)",
              borderColor: "var(--filter-border)",
              overflow: "hidden",
            }}
          >
            <div className="p-5 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-80px)]" style={{ width: 300 }}>
              <h2 className="text-lg font-bold mb-5" style={{ color: "#0A1830" }}>
                Filtros
              </h2>
              <SearchFilters />
            </div>

            {/* Collapse/Expand toggle button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="absolute z-10 flex items-center justify-center w-6 h-12 rounded-r-lg shadow-md transition-all duration-300 border"
              style={{
                right: -24,
                top: 60,
                backgroundColor: "var(--filter-bg)",
                borderColor: "var(--filter-border)",
              }}
              aria-label={sidebarOpen ? "Colapsar filtros" : "Expandir filtros"}
            >
              {sidebarOpen ? (
                <ChevronLeft size={16} style={{ color: "#0A1830" }} />
              ) : (
                <ChevronRight size={16} style={{ color: "#0A1830" }} />
              )}
            </button>
          </aside>

          {/* DESKTOP: Toggle button when sidebar is collapsed */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="hidden md:flex absolute z-10 items-center justify-center w-6 h-12 rounded-r-lg shadow-md border"
              style={{
                left: 0,
                top: 104,
                backgroundColor: "var(--filter-bg)",
                borderColor: "var(--filter-border)",
              }}
              aria-label="Expandir filtros"
            >
              <ChevronRight size={16} style={{ color: "#0A1830" }} />
            </button>
          )}

          {/* Right section - Search results */}
          <section className="flex-1 p-4 md:p-6 overflow-auto">
            <h1 className="text-lg md:text-xl font-bold mb-4 md:mb-6" style={{ color: "#0A1830" }}>
              Resultados de búsqueda
            </h1>

            {/* Results list */}
            <div className="flex flex-col gap-4 md:gap-5">
              {MOCK_RESULTS.map((result, index) => (
                <ResultCard key={index} data={result} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
