import { SiteNavbar } from "@/components/site-navbar"
import { AvailabilityCalendar } from "@/components/availability-calendar"

interface PageProps {
  params: Promise<{ hotelId: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { hotelId } = await params
  return {
    title: `Disponibilidad – Hotel ${hotelId}`,
    description: "Gestiona la disponibilidad mensual de tu hotel.",
  }
}

export default async function AvailabilityPage({ params }: PageProps) {
  const { hotelId } = await params

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F6F7F9" }}>
      <SiteNavbar />
      <AvailabilityCalendar hotelId={hotelId} />
    </main>
  )
}
