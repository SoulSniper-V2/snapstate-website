import { ArrowRight } from "lucide-react"

const rows = [
  {
    num: "01",
    label: "Window Mutations",
    detail:
      "Leverages low-level AXUIElementSetAttributeValue system calls to programmatically inject kAXPositionAttribute and kAXSizeAttribute directly onto target windows.",
  },
  {
    num: "02",
    label: "State Serialization",
    detail:
      "Stores layout contexts into ~/Library/Application Support/SnapState/states.json using strict ISO-8601 timestamps and an optimized schema layout.",
  },
  {
    num: "03",
    label: "Settling Routines",
    detail:
      "Implements a precise 1.2-second post-launch thread settling interval to allow heavy system apps to spawn target window elements safely before layout adjustment.",
  },
]

export function ArchitectureTable() {
  return (
    <section id="architecture" className="mx-auto w-full max-w-6xl px-6 pb-28">
      <div className="mb-12 max-w-2xl">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-neutral-100 md:text-4xl">
          Subsystem architecture.
        </h2>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-neutral-400">
          A breakdown of the implementation details that keep restores deterministic and fast.
        </p>
      </div>

      <div className="relative border-t border-white/[0.08] overflow-hidden">
        {/* Top scan lines (Linear style) */}
        <div className="absolute top-0 left-0 h-[1.5px] w-48 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-laser" />

        {rows.map((row) => (
          <div
            key={row.label}
            className="group relative grid grid-cols-1 gap-3 border-b border-white/[0.06] py-8 px-4 transition-all duration-300 hover:bg-white/[0.01] -mx-4 rounded-lg md:grid-cols-[280px_1fr] md:gap-10"
          >
            {/* Hover highlight bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-blue-500 scale-y-0 transition-transform duration-300 group-hover:scale-y-100" />
            
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-neutral-600">{row.num}</span>
              <div className="font-semibold tracking-tight text-neutral-200 transition-colors group-hover:text-white flex items-center gap-1.5">
                {row.label}
                <ArrowRight className="size-3.5 opacity-0 -translate-x-1.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-blue-400" />
              </div>
            </div>
            
            <p className="max-w-2xl text-xs leading-relaxed text-neutral-400 transition-colors group-hover:text-neutral-300">
              {row.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
