import { SiteNavbar } from "@/components/site-navbar"
import { HeroHeader } from "@/components/hero-header"
import { SearchBar } from "@/components/search-bar"
import { PromoSection } from "@/components/promo-section"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: "#0B1F3A" }}>
      {/* Top navigation */}
      <SiteNavbar />

      {/* Section 1: Hero header */}
      <HeroHeader />

      {/* Section 2: Search bar (attached to header) */}
      <SearchBar />

      {/* Section 3: Promotional */}
      <PromoSection />

      {/* Section 4: How it works */}
      <HowItWorks />

      {/* Section 5: Testimonials */}
      <Testimonials />

      {/* Section 6: Footer */}
      <SiteFooter />
    </main>
  )
}
