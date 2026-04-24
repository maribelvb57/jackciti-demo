"use client"

import { useState } from "react"
import { SiteNavbar } from "@/components/site-navbar"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function BusquedaPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: "#0B1F3A" }}>
      {/* Top navigation */}
      <SiteNavbar />

      {/* Main content area */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-[1200px] flex" style={{ backgroundColor: "#F7EEDF" }}>
          
          {/* Left sidebar - Filters */}
          <aside
            className="relative flex-shrink-0 transition-all duration-300 ease-in-out border-r"
            style={{
              width: sidebarOpen ? 300 : 0,
              borderColor: "#E5DFC8",
              backgroundColor: "#FFFDF8",
              overflow: "hidden",
            }}
          >
            <div className="p-5" style={{ width: 300 }}>
              <h2 className="text-lg font-bold mb-4" style={{ color: "#0A1830" }}>
                Filtros
              </h2>
              {/* Placeholder for filters - will be implemented later */}
              <p className="text-sm" style={{ color: "#666" }}>
                Los filtros irán aquí
              </p>
            </div>

            {/* Collapse/Expand toggle button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="absolute z-10 flex items-center justify-center w-6 h-12 rounded-r-lg shadow-md transition-all duration-300"
              style={{
                right: -24,
                top: 60,
                backgroundColor: "#FFFDF8",
                border: "1px solid #E5DFC8",
                borderLeft: "none",
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

          {/* Toggle button when sidebar is collapsed */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="absolute z-10 flex items-center justify-center w-6 h-12 rounded-r-lg shadow-md"
              style={{
                left: 0,
                top: 104,
                backgroundColor: "#FFFDF8",
                border: "1px solid #E5DFC8",
                borderLeft: "none",
              }}
              aria-label="Expandir filtros"
            >
              <ChevronRight size={16} style={{ color: "#0A1830" }} />
            </button>
          )}

          {/* Right section - Search results */}
          <section className="flex-1 p-6 overflow-auto">
            <h1 className="text-xl font-bold mb-6" style={{ color: "#0A1830" }}>
              Resultados de búsqueda
            </h1>

            {/* Results grid */}
            <div className="flex flex-col gap-5">
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border-2"
                  style={{
                    width: "100%",
                    maxWidth: 800,
                    height: 550,
                    borderColor: "#D1D5DB",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  {/* Card content placeholder */}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
