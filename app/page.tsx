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
        
        <div className="flex-1 flex items-center justify-center mt-8 md:mt-12 overflow-visible z-20">
          <DemoVideo />
        </div>
      </div>

      {/* ─── Below the fold ─── */}
      <div className="mt-24 md:mt-32">
        <div className="w-full max-w-[1120px] mx-auto px-4 md:px-6 mb-32">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-3">Interactive Playground</h2>
            <p className="text-neutral-400">Test the frontend UI logic. Click a workspace to restore.</p>
          </div>
          <MacFrame />
        </div>

        <SpecsGrid />
        <ArchitectureTable />
        <Footer />
      </div>
    </main>
  )
}
