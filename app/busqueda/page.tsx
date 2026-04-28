"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { SiteNavbar } from "@/components/site-navbar"
import { ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpDown, ChevronDown, X } from "lucide-react"
import { ResultCard, type ResultCardData } from "@/components/result-card"
import { SearchFilters } from "@/components/search-filters"
import { SearchBenefitsBanner } from "@/components/search-benefits-banner"

const ORDENAR_OPTIONS = [
  "Recomendados de Jack",
  "Precio menor a mayor",
  "Precio mayor a menor",
  "Mejor puntuación Usuarios",
]

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
    recommended: true,
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

async function getSearchResults(): Promise<ResultCardData[]> {
  await new Promise((resolve) => setTimeout(resolve, 250))
  return MOCK_RESULTS
}

export default function BusquedaPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [mobileOrdenar, setMobileOrdenar] = useState("Recomendados de Jack")
  const [mobileOrdenarOpen, setMobileOrdenarOpen] = useState(false)
  const {
    data: searchResults = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["search-results"],
    queryFn: getSearchResults,
  })

  return (
    <main className="min-h-screen flex flex-col items-center" style={{ backgroundColor: "#0B1F3A" }}>
      <div className="w-full max-w-[1200px] flex flex-col">
        {/* Top navigation */}
        <SiteNavbar />

        {/* Benefits banner - Full width */}
        <SearchBenefitsBanner />

        {/* Main content area */}
        <div className="relative w-full flex flex-col md:flex-row flex-1" style={{ backgroundColor: "#F3F4F6" }}>

          {/* MOBILE: Top pill bar */}
          <div
            className="md:hidden flex items-center justify-between px-4 py-2.5 border-b flex-shrink-0 gap-3"
            style={{ backgroundColor: "#ffffff", borderColor: "#E5E7EB" }}
          >
            {/* Filtros pill */}
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border shadow-sm transition-all flex-1 justify-center"
              style={{
                backgroundColor: mobileFiltersOpen ? "#0A1830" : "#fff",
                color: mobileFiltersOpen ? "#fff" : "#0A1830",
                borderColor: "#0A1830",
              }}
            >
              <SlidersHorizontal size={13} />
              Filtros
            </button>

            {/* Ordenar por pill + combobox */}
            <div className="relative flex-1">
              <button
                onClick={() => setMobileOrdenarOpen(!mobileOrdenarOpen)}
                className="w-full flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border shadow-sm transition-all justify-center"
                style={{
                  backgroundColor: mobileOrdenarOpen ? "#0A1830" : "#fff",
                  color: mobileOrdenarOpen ? "#fff" : "#0A1830",
                  borderColor: "#0A1830",
                }}
              >
                <ArrowUpDown size={13} />
                <span className="truncate max-w-[100px]">Ordenar por</span>
                <ChevronDown size={13} style={{ transform: mobileOrdenarOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
              </button>
              {mobileOrdenarOpen && (
                <div
                  className="absolute top-full mt-1 right-0 z-50 rounded-xl border shadow-lg overflow-hidden"
                  style={{ backgroundColor: "#fff", borderColor: "#D1D5DB", minWidth: 200 }}
                >
                  {ORDENAR_OPTIONS.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => { setMobileOrdenar(option); setMobileOrdenarOpen(false) }}
                      className="w-full px-4 py-2.5 text-left text-xs font-medium transition-colors"
                      style={{
                        backgroundColor: mobileOrdenar === option ? "#FEF9C3" : "transparent",
                        color: "#0A1830",
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MOBILE: Filters drawer panel */}
          {mobileFiltersOpen && (
            <div
              className="md:hidden border-b overflow-y-auto flex-shrink-0"
              style={{
                backgroundColor: "#ffffff",
                borderColor: "#E5E7EB",
                maxHeight: "70vh",
              }}
            >
              <div className="flex items-center justify-between px-4 pt-3 pb-1">
                <span className="text-sm font-bold" style={{ color: "#0A1830" }}>Filtros</span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-full"
                  style={{ color: "#0A1830" }}
                  aria-label="Cerrar filtros"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="px-4 pb-4">
                <SearchFilters />
              </div>
            </div>
          )}

          {/* DESKTOP: Left sidebar - Filters */}
          <aside
            className="hidden md:block relative flex-shrink-0 transition-all duration-300 ease-in-out border-r"
            style={{
              width: sidebarOpen ? 300 : 0,
              backgroundColor: "#ffffff",
              borderColor: "#E5E7EB",
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
                backgroundColor: "#ffffff",
                border: "1px solid #E5E7EB",
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
                backgroundColor: "#ffffff",
                border: "1px solid #E5E7EB",
              }}
              aria-label="Expandir filtros"
            >
              <ChevronRight size={16} style={{ color: "#0A1830" }} />
            </button>
          )}

          {/* Right section - Search results */}
          <section className="p-4 md:p-6 overflow-auto" style={{ maxWidth: "calc(100% - 120px)" }}>
            <h1 className="text-lg md:text-xl font-bold mb-4 md:mb-6" style={{ color: "#0A1830" }}>
              Resultados de busqueda
            </h1>

            {isLoading && (
              <div className="rounded-2xl border px-5 py-6 text-sm font-medium" style={{ backgroundColor: "#FFFFFF", borderColor: "#D9E0EA", color: "#0A1830" }}>
                Cargando resultados...
              </div>
            )}

            {isError && (
              <div className="rounded-2xl border px-5 py-6 text-sm font-medium" style={{ backgroundColor: "#FFFFFF", borderColor: "#F3C1C1", color: "#8A1C1C" }}>
                No pudimos cargar los resultados. Intenta nuevamente.
              </div>
            )}

            {/* Results list */}
            {!isLoading && !isError && (
              <div className="flex flex-col gap-4 md:gap-5">
                {searchResults.map((result, index) => (
                  <ResultCard key={index} data={result} />
                ))}
              </div>
            )}
          </section>

          {/* Right margin spacer - 120px */}
          <div style={{ width: "120px", flexShrink: 0 }} />
        </div>
      </div>
    </main>
  )
}
