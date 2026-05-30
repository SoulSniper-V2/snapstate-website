import { Nav } from "@/components/snapstate/nav"
import { Hero } from "@/components/snapstate/hero"
import { MacFrame } from "@/components/snapstate/mac-frame"
import { SpecsGrid } from "@/components/snapstate/specs-grid"
import { ArchitectureTable } from "@/components/snapstate/architecture-table"
import { Footer } from "@/components/snapstate/footer"

import { DemoVideo } from "@/components/snapstate/demo-video"

export default function Page() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-neutral-100 overflow-x-hidden">
      <Nav />
      
      {/* ─── Above-the-fold hero viewport ─── */}
      <div className="relative min-h-[100svh] flex flex-col">
        <Hero />
        
        {/* MacFrame peeks up from the bottom — overflow visible so it extends */}
        <div className="flex-1 flex items-end justify-center mt-16 md:mt-20 overflow-visible">
          <div className="w-full max-w-[1120px] mx-auto px-4 md:px-6">
            <MacFrame />
          </div>
        </div>
      </div>

      {/* ─── Below the fold ─── */}
      <div className="mt-12 md:mt-16">
        <DemoVideo />
        <SpecsGrid />
        <ArchitectureTable />
        <Footer />
      </div>
    </main>
  )
}
