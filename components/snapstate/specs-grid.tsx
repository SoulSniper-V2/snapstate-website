"use client"

import React, { useRef, useState } from "react"

const specs = [
  {
    title: "Window Coordinate Mapping",
    description: "Precisely captures the position and bounds of every on-screen window across all active spaces.",
    api: "CGWindowListCopyWindowInfo",
  },
  {
    title: "Deep Browser Session Spying",
    description: "Reads active tab URLs and window state from supported browsers (Safari, Chrome, Edge, Brave, Arc) for full context restoration.",
    api: "NSAppleScript Integration",
  },
  {
    title: "Hardware Topology Auditing",
    description: "Detects monitor arrangement and resolution changes to remap layouts onto the correct displays.",
    api: "NSApplication.didChangeScreenParameters",
  },
  {
    title: "Global Keyboard Trigger",
    description: "Instantly restore target workspaces from any active application using system-wide hotkeys (⌃⌘1-6).",
    api: "RegisterEventHotKey (Carbon)",
  },
  {
    title: "Monitor Auto-Restore",
    description: "Arms workspaces to trigger layout-only rebuilds automatically when screen setups change.",
    api: "NSNotificationCenter Observer",
  },
  {
    title: "Zero-Footprint Agent",
    description: "Runs as a lightweight menu bar background process with no Dock icon and negligible resource overhead.",
    api: "LSUIElement Subsystem",
  },
]

export function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [isFocused, setIsFocused] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`relative overflow-hidden rounded-xl border border-white/[0.06] bg-[#0C0C0E]/40 backdrop-blur-md transition-colors duration-300 hover:bg-[#0F0F12]/60 ${className}`}
    >
      {/* Background radial highlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(200px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.03), transparent 80%)`,
        }}
      />
      
      {/* Border spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.12), transparent 80%)`,
          WebkitMaskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black) border-box`,
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px"
        }}
      />
      
      <div className="relative z-20 flex h-full flex-col">
        {children}
      </div>
    </div>
  )
}

export function SpecsGrid() {
  return (
    <section id="core-engine" className="relative mx-auto w-full max-w-6xl px-6 pb-24">
      {/* Subtle grid light behind section */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-full max-w-5xl -translate-x-1/2 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.02)_0%,_transparent_60%)] blur-3xl pointer-events-none" />

      <div className="mb-12 max-w-2xl">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-neutral-100 md:text-4xl">
          Built on the macOS core.
        </h2>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-neutral-400">
          Every feature taps directly into native system APIs — no fragile workarounds, no electron bloat.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {specs.map((spec) => (
          <SpotlightCard key={spec.title} className="flex flex-col gap-4 p-7">
            <h3 className="text-base font-semibold tracking-tight text-neutral-100">{spec.title}</h3>
            <p className="text-xs leading-relaxed text-neutral-400 flex-1">{spec.description}</p>
            <div className="mt-4 pt-4 border-t border-white/[0.04] w-full flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-mono">Kernel Hook</span>
              <code className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-neutral-300 group-hover:text-white">
                {spec.api}
              </code>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  )
}
