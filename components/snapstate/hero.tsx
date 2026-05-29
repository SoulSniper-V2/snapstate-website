"use client"

import { ArrowDownToLine, Github } from "lucide-react"
import { useEffect, useState } from "react"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [])

  return (
    <section
      style={{
        position: "relative",
        maxWidth: 1100,
        margin: "0 auto",
        padding: "80px 24px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* ─── Headline ─── */}
        <h1
          style={{
            maxWidth: 820,
            fontSize: "clamp(2.8rem, 6.5vw, 5rem)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "#fff",
            margin: 0,
            /* entrance animation */
            opacity: mounted ? 1 : 0,
            filter: mounted ? "blur(0px)" : "blur(12px)",
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), filter 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          Save your workspace.{" "}
          <span
            style={{
              background: "linear-gradient(to bottom, #ffffff, #666666)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Restore it instantly.
          </span>
        </h1>

        {/* ─── Subtitle ─── */}
        <p
          style={{
            marginTop: 24,
            maxWidth: 520,
            fontSize: 16,
            lineHeight: 1.65,
            color: "#888",
            /* entrance animation — delayed */
            opacity: mounted ? 1 : 0,
            filter: mounted ? "blur(0px)" : "blur(8px)",
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.9s 0.15s cubic-bezier(0.16,1,0.3,1), filter 0.9s 0.15s cubic-bezier(0.16,1,0.3,1), transform 0.9s 0.15s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          A native macOS utility that captures and restores window positions,
          monitor layouts, and browser tabs with a single shortcut.
        </p>

        {/* ─── CTA Buttons ─── */}
        <div
          style={{
            marginTop: 36,
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            /* entrance animation — more delay */
            opacity: mounted ? 1 : 0,
            filter: mounted ? "blur(0px)" : "blur(6px)",
            transform: mounted ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.9s 0.3s cubic-bezier(0.16,1,0.3,1), filter 0.9s 0.3s cubic-bezier(0.16,1,0.3,1), transform 0.9s 0.3s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <a
            href="https://github.com/SoulSniper-V2/SnapState/releases/download/v2.3.3/SnapState.dmg"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: 8,
              background: "#fff",
              padding: "10px 20px",
              fontSize: 13,
              fontWeight: 600,
              color: "#000",
              textDecoration: "none",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e5e5")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
          >
            <ArrowDownToLine style={{ width: 14, height: 14 }} strokeWidth={2.5} />
            Download for macOS
          </a>

          <a
            href="https://github.com/SoulSniper-V2/SnapState"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.02)",
              padding: "10px 20px",
              fontSize: 13,
              fontWeight: 600,
              color: "#ccc",
              textDecoration: "none",
              transition: "border-color 0.15s, background 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"
              e.currentTarget.style.background = "rgba(255,255,255,0.05)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"
              e.currentTarget.style.background = "rgba(255,255,255,0.02)"
            }}
          >
            <Github style={{ width: 14, height: 14 }} strokeWidth={1.8} />
            View Source
          </a>
        </div>
      </div>
    </section>
  )
}
