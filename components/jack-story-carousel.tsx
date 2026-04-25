"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const STORY_SLIDES = [
  {
    id: 1,
    image: "/images/jack-story-01.jpg",
    title: "Conoce a Jack",
    pillLabel: "Nuestro protagonista",
    subtitle: "Un Jack Russell Terrier muy especial",
    description:
      "Jack es un perrito amigable, sociable y lleno de energía. Le encanta conocer nuevos amigos, jugar y explorar. Con sus gafas amarillas y su estilo único, Jack siempre está listo para la aventura.",
    bgColor: "#FFF8E7",
    accentColor: "#D4A853",
  },
  {
    id: 2,
    image: "/images/jack-story-02.jpg",
    title: "Un día difícil",
    pillLabel: "La despedida",
    subtitle: "Cuando su buddy tuvo que partir...",
    description:
      "Un día, el mejor amigo de Jack tuvo que salir de vacaciones y no pudo llevarlo. Jack se quedó solo en casa, extrañándolo mucho y preguntándose cómo hacer para no extrañarlo tanto la próxima vez.",
    bgColor: "#E8F5EC",
    accentColor: "#5A9E6F",
  },
  {
    id: 3,
    image: "/images/jack-story-03.jpg",
    title: "La gran búsqueda",
    pillLabel: "La aventura",
    subtitle: "Jack sale a explorar la ciudad",
    descriptionJsx: true,
    description:
      "Decidido a que ningún perrito pasara por lo mismo, Jack salió a recorrer las calles de la ciudad. Visitó cada hotel canino, evaluó sus instalaciones, conoció a los cuidadores y probó todas las camas.",
    bgColor: "#E8F1F8",
    accentColor: "#5B8DB8",
  },
  {
    id: 4,
    image: "/images/jack-story-04.jpg",
    title: "Nace JackCity",
    pillLabel: "El comienzo",
    subtitle: "Los mejores hoteles, aprobados por Jack",
    description:
      "Después de su exhaustiva investigación, Jack seleccionó los mejores hoteles caninos de la ciudad. Ahora, cada hotel en JackCity tiene el sello de aprobación de Jack. ¡Tu mascota merece lo mejor!",
    bgColor: "#FEF7F7",
    accentColor: "#C26B6B",
  },
]

export function JackStoryCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % STORY_SLIDES.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + STORY_SLIDES.length) % STORY_SLIDES.length)
  }

  const slide = STORY_SLIDES[currentSlide]

  return (
    <section id="historia-de-jack" className="w-full" style={{ backgroundColor: "#0A1830" }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <div className="text-center pt-12 pb-8 px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#FFB800" }}>
            La Historia de Jack
          </h2>
          <p className="text-base md:text-lg" style={{ color: "#F7EEDF" }}>
            Descubre cómo nació JackCity
          </p>
        </div>

        {/* Carousel container */}
        <div
          className="relative mx-4 md:mx-8 rounded-3xl overflow-hidden transition-colors duration-500"
          style={{ backgroundColor: slide.bgColor }}
        >
          {/* Content */}
          <div className="flex flex-col md:flex-row min-h-[500px] md:min-h-[450px]">
            {/* Image side */}
            <div className="relative w-full md:w-1/2 h-[300px] md:h-auto flex-shrink-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover md:object-contain object-center p-4 md:p-8"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Text side */}
            <div className="flex-1 flex flex-col justify-center p-6 md:p-10 md:pl-4 md:pr-20 max-w-xl">
              {/* Pill label */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4 w-fit"
                style={{
                  backgroundColor: slide.accentColor,
                  color: "#fff",
                }}
              >
                <span>{slide.pillLabel}</span>
              </div>

              <h3
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ color: "#0A1830" }}
              >
                {slide.title}
              </h3>

              <p
                className="text-base md:text-lg font-medium mb-4"
                style={{ color: slide.accentColor }}
              >
                {slide.subtitle}
              </p>

              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: "#555" }}
              >
                {slide.descriptionJsx ? (
                  <>
                    Decidido a que ningún perrito pasara por lo mismo, Jack salió a recorrer las calles de la ciudad. Visitó cada hotel canino, evaluó sus instalaciones, conoció a los cuidadores y{" "}
                    <strong className="font-sans font-bold tracking-wide" style={{ color: "#0A1830" }}>
                      probó todas las camas!
                    </strong>
                  </>
                ) : (
                  slide.description
                )}
              </p>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
            style={{ backgroundColor: "#fff", color: "#0A1830" }}
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg"
            style={{ backgroundColor: "#FFB800", color: "#0A1830" }}
            aria-label="Siguiente"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots navigation */}
        <div className="flex items-center justify-center gap-3 py-8">
          {STORY_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="w-3 h-3 rounded-full transition-all"
              style={{
                backgroundColor: index === currentSlide ? "#FFB800" : "#3A4A5A",
                transform: index === currentSlide ? "scale(1.3)" : "scale(1)",
              }}
              aria-label={`Ir al paso ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
