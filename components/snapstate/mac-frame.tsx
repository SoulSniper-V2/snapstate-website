"use client"

import React, { useState, useCallback, useEffect, useRef } from "react"
import {
  Code,
  Palette,
  FileText,
  MessageSquare,
  Plus,
  Wifi,
  Battery,
  Compass,
  Music,
} from "lucide-react"

/* ──────────────── types ──────────────── */
interface Workspace {
  id: string
  name: string
  icon: React.ComponentType<any>
  windowsCount: number
  shortcut: string
}

const WORKSPACES: Workspace[] = [
  { id: "dev", name: "Development", icon: Code, windowsCount: 3, shortcut: "⌘1" },
  { id: "design", name: "Design", icon: Palette, windowsCount: 2, shortcut: "⌘2" },
  { id: "writing", name: "Writing", icon: FileText, windowsCount: 2, shortcut: "⌘3" },
  { id: "social", name: "Social", icon: MessageSquare, windowsCount: 2, shortcut: "⌘4" },
]

/* ──────────────── window layout configs ──────────────── */
type WinStyle = React.CSSProperties

function getWindowStyle(winId: string, activeId: string): WinStyle {
  const hidden: WinStyle = { opacity: 0, transform: "scale(0.92) translateY(8px)", pointerEvents: "none" }
  const layouts: Record<string, Record<string, WinStyle>> = {
    vscode:   { initial: { opacity: 1, transform: "scale(1) rotate(-2deg)", top: "15%", left: "15%",  width: "50%", height: "60%" },
                dev:    { opacity: 1, transform: "scale(1)", top: "12%", left: "2%",  width: "56%", height: "82%" } },
    safari:   { initial: { opacity: 1, transform: "scale(1) rotate(3deg)", top: "25%", left: "40%", width: "45%", height: "50%" },
                dev:    { opacity: 1, transform: "scale(1)", top: "12%", left: "60%", width: "38%", height: "40%" },
                design: { opacity: 1, transform: "scale(1)", top: "12%", left: "72%", width: "26%", height: "82%" },
                social: { opacity: 1, transform: "scale(1)", top: "12%", left: "45%", width: "53%", height: "82%" } },
    terminal: { initial: { opacity: 1, transform: "scale(1) rotate(-1deg)", top: "45%", left: "20%", width: "40%", height: "40%" },
                dev:    { opacity: 1, transform: "scale(1)", top: "56%", left: "60%", width: "38%", height: "38%" } },
    figma:    { design: { opacity: 1, transform: "scale(1)", top: "12%", left: "2%",  width: "68%", height: "82%" } },
    notion:   { writing:{ opacity: 1, transform: "scale(1)", top: "12%", left: "8%",  width: "52%", height: "82%" } },
    spotify:  { initial: { opacity: 1, transform: "scale(1) rotate(2deg)", top: "50%", left: "60%", width: "30%", height: "40%" },
                writing:{ opacity: 1, transform: "scale(1)", top: "22%", left: "63%", width: "34%", height: "66%" } },
    telegram: { social: { opacity: 1, transform: "scale(1)", top: "18%", left: "4%",  width: "38%", height: "70%" } },
  }
  return layouts[winId]?.[activeId] ?? hidden
}

/* ──────────────── window chrome helper ──────────────── */
function WinChrome({ title }: { title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", height: 28, borderBottom: "1px solid rgba(255,255,255,0.04)", background: "rgba(0,0,0,0.25)", padding: "0 12px" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F56", marginRight: 6 }} />
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FFBD2E", marginRight: 6 }} />
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#27C93F", marginRight: 6 }} />
      <span style={{ flex: 1, textAlign: "center", fontFamily: "monospace", fontSize: 10, color: "#777" }}>{title}</span>
    </div>
  )
}

/* ──────────────── component ──────────────── */
export function MacFrame() {
  const [activeId, setActiveId] = useState("initial")
  const [popoverOpen, setPopoverOpen] = useState(false)

  // Entrance animation stages
  const [stage, setStage] = useState(0) // 0 = hidden, 1 = border glint, 2 = content visible
  const [cursorState, setCursorState] = useState({ x: 100, y: 100, opacity: 0, scale: 1, isHoveringDev: false })

  useEffect(() => {
    // 1. Entrance animations
    const t1 = setTimeout(() => setStage(1), 200)   // border appears
    const t2 = setTimeout(() => setStage(2), 900)  // content fades in
    
    // 2. Attract Mode Sequence
    // Open popover
    const t3 = setTimeout(() => setPopoverOpen(true), 1600)
    
    // Move cursor in
    const t4 = setTimeout(() => setCursorState({ x: 230, y: 110, opacity: 1, scale: 1, isHoveringDev: false }), 2000)
    
    // Hover on "dev" button
    const t5 = setTimeout(() => setCursorState({ x: 230, y: 110, opacity: 1, scale: 1, isHoveringDev: true }), 2600)
    
    // Click!
    const t6 = setTimeout(() => {
      setCursorState(p => ({ ...p, scale: 0.9 }))
      setActiveId("dev")
    }, 3200)
    
    // Release click
    const t7 = setTimeout(() => setCursorState(p => ({ ...p, scale: 1 })), 3400)
    
    // Hide cursor and unlock
    const t8 = setTimeout(() => {
      setCursorState(p => ({ ...p, opacity: 0, isHoveringDev: false }))
    }, 4000)

    return () => { 
      [t1, t2, t3, t4, t5, t6, t7, t8].forEach(clearTimeout) 
    }
  }, [])

  const doRestore = useCallback((wId: string) => {
    setActiveId(wId)
  }, [])

  /* keyboard shortcuts */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return
      const map: Record<string, string> = { "1": "dev", "2": "design", "3": "writing", "4": "social" }
      if (map[e.key]) doRestore(map[e.key])
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [doRestore])

  const winTransition = "all 0.7s cubic-bezier(0.25,0.8,0.25,1)"

  return (
    <div style={{ position: "relative" }}>
      {/* ─── Outer border wrapper with glint animation ─── */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "1px",
          borderRadius: 16,
          /* entrance: border glow */
          opacity: stage >= 1 ? 1 : 0,
          transform: stage >= 1 ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Glint sweep — runs once then settles */}
        <div
          style={{
            position: "absolute",
            inset: "-200%",
            background: "conic-gradient(from 0deg at 50% 50%, transparent 30%, rgba(120,160,255,0.5) 48%, rgba(255,255,255,0.7) 50%, rgba(120,160,255,0.5) 52%, transparent 70%)",
            pointerEvents: "none",
            animation: stage >= 1 ? "glint-sweep 1.8s cubic-bezier(0.4,0,0.2,1) forwards" : "none",
          }}
        />

        {/* Static subtle border glow (visible after glint finishes) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.08)",
            pointerEvents: "none",
            opacity: stage >= 2 ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />

        {/* ─── Inner panel ─── */}
        <div style={{ position: "relative", zIndex: 10, overflow: "hidden", borderRadius: 15, background: "#0A0A0C" }}>

          {/* Title bar */}
          <div style={{ display: "flex", alignItems: "center", height: 40, borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#0F0F12", padding: "0 16px", userSelect: "none" }}>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F56" }} />
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#27C93F" }} />
            </div>
            <span style={{ flex: 1, textAlign: "center", fontFamily: "monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "#555" }}>
              SnapState — {activeId.toUpperCase()}
            </span>
            <div style={{ width: 52 }} />
          </div>

          {/* Desktop body */}
          <div
            style={{
              position: "relative",
              aspectRatio: "16/9",
              width: "100%",
              overflow: "hidden",
              background: "#0a0a0f",
              /* Stage 2: content fades in */
              opacity: stage >= 2 ? 1 : 0,
              transition: "opacity 0.7s 0.1s ease",
            }}
          >
            {/* Desktop gradient */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top right, rgba(30,58,138,0.3), rgba(49,46,129,0.15), #0a0a0f)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at bottom left, rgba(76,29,149,0.2), rgba(30,41,59,0.08), transparent)", pointerEvents: "none" }} />

            {/* macOS Menu Bar */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 30, display: "flex", alignItems: "center", justifyContent: "space-between", height: 28, borderBottom: "1px solid rgba(255,255,255,0.04)", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(20px)", padding: "0 16px", fontSize: 11, fontWeight: 500, color: "#ddd", userSelect: "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <svg viewBox="0 0 17 20" style={{ width: 12, height: 12, fill: "#ddd" }}>
                  <path d="M15.013 11.23c-.015-2.28 1.847-3.38 1.93-3.43-1.055-1.547-2.69-1.758-3.267-1.805-1.378-.14-2.697.813-3.396.813-.7 0-1.794-.797-2.955-.774-1.527.023-2.935.89-3.722 2.262-1.59 2.766-.407 6.84 1.134 9.06 1.703 2.457 2.19 3.01 2.71 3.03.504.02 2.13-.6 2.72-.6.59 0 2.19.6 2.717.59.54-.01 1.62-.65 2.146-1.42.607-.89 1.11-2.484 1.127-2.523-.04-.016-3.208-1.23-3.228-4.94M11.96 3.122c.616-.75 1.03-1.79.917-2.83-.89.035-1.973.593-2.613 1.343-.56.645-.968 1.696-.832 2.72.993.078 2.008-.48 2.527-1.233" />
                </svg>
                <span style={{ fontWeight: 600, color: "#fff" }}>Finder</span>
                <span style={{ opacity: 0.7 }}>File</span>
                <span style={{ opacity: 0.7 }}>Edit</span>
                <span style={{ opacity: 0.7 }}>View</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Wifi style={{ width: 14, height: 14, opacity: 0.8 }} />
                <Battery style={{ width: 14, height: 14, opacity: 0.8 }} />
                <span style={{ opacity: 0.8 }}>Fri 4:47 PM</span>
                <button
                  onPointerDown={(e) => { e.stopPropagation(); setPopoverOpen(v => !v) }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 20, height: 20, borderRadius: 4, border: "none", cursor: "pointer", background: popoverOpen ? "rgba(255,255,255,0.1)" : "transparent", padding: 0 }}
                >
                  <img src="/app-icon.png" alt="SnapState" style={{ width: 14, height: 14, objectFit: "contain" }} />
                </button>
              </div>
            </div>

            {/* ═══════ SIMULATED WINDOWS ═══════ */}
            <div style={{ position: "absolute", inset: 0, paddingTop: 28, pointerEvents: "none" }}>
              {/* VS Code */}
              <div style={{ position: "absolute", overflow: "hidden", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(30,30,30,0.95)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)", transition: winTransition, ...getWindowStyle("vscode", activeId) }}>
                <WinChrome title="main.rs — snap-state" />
                <div style={{ padding: 12, fontFamily: "monospace", fontSize: 9, lineHeight: 1.7, color: "#999", userSelect: "none" }}>
                  <div style={{ color: "#555" }}>{"// SnapState core activation routine"}</div>
                  <div><span style={{ color: "#f472b6" }}>fn</span> <span style={{ color: "#60a5fa" }}>main</span>() {"{"}</div>
                  <div style={{ paddingLeft: 12 }}><span style={{ color: "#f472b6" }}>let</span> <span style={{ color: "#e5e5e5" }}>store</span> = <span style={{ color: "#facc15" }}>WorkspaceStore</span>::<span style={{ color: "#60a5fa" }}>load</span>();</div>
                  <div style={{ paddingLeft: 12 }}><span style={{ color: "#f472b6" }}>let</span> <span style={{ color: "#e5e5e5" }}>workspace</span> = <span style={{ color: "#e5e5e5" }}>store</span>.<span style={{ color: "#60a5fa" }}>find</span>(<span style={{ color: "#34d399" }}>&quot;Development&quot;</span>);</div>
                  <div style={{ paddingLeft: 12 }}><span style={{ color: "#e5e5e5" }}>workspace</span>.<span style={{ color: "#60a5fa" }}>restore</span>().<span style={{ color: "#60a5fa" }}>unwrap</span>();</div>
                  <div>{"}"}</div>
                </div>
              </div>

              {/* Safari */}
              <div style={{ position: "absolute", overflow: "hidden", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(37,37,40,0.95)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)", transition: winTransition, ...getWindowStyle("safari", activeId) }}>
                <WinChrome title="snapstate.app/docs" />
                <div style={{ padding: 12, fontSize: 10, color: "#ccc", userSelect: "none" }}>
                  <h4 style={{ fontWeight: 600, color: "#fff", margin: 0 }}>System APIs Integration</h4>
                  <p style={{ marginTop: 4, fontSize: 9, color: "#999", lineHeight: 1.5 }}>SnapState utilizes Accessibility Services to query active window positions and programmatic layouts without root access.</p>
                  <div style={{ marginTop: 8, display: "flex", gap: 4 }}>
                    <span style={{ background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: 4, fontSize: 8, fontFamily: "monospace", color: "#999" }}>AXUIElement</span>
                    <span style={{ background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: 4, fontSize: 8, fontFamily: "monospace", color: "#999" }}>AppleScript</span>
                  </div>
                </div>
              </div>

              {/* Terminal */}
              <div style={{ position: "absolute", overflow: "hidden", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,10,13,0.95)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)", transition: winTransition, ...getWindowStyle("terminal", activeId) }}>
                <WinChrome title="zsh" />
                <div style={{ padding: 12, fontFamily: "monospace", fontSize: 9, lineHeight: 1.7, color: "#999", userSelect: "none" }}>
                  <div>$ snapstate restore dev</div>
                  <div style={{ color: "#60a5fa" }}>[info] Restoring workspace &quot;Development&quot;</div>
                  <div style={{ color: "#777" }}>[info] launched Safari (2.1s)</div>
                  <div style={{ color: "#34d399" }}>[ok] Window frames aligned successfully.</div>
                  <div>$ <span style={{ animation: "pulse 1.5s infinite" }}>_</span></div>
                </div>
              </div>

              {/* Figma */}
              <div style={{ position: "absolute", overflow: "hidden", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(44,44,44,0.95)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)", transition: winTransition, ...getWindowStyle("figma", activeId) }}>
                <WinChrome title="SnapState Design UI" />
                <div style={{ padding: 12, userSelect: "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#999" }}>
                    <span>HUD Wireframes</span><span>72%</span>
                  </div>
                  <div style={{ marginTop: 8, border: "1px solid rgba(255,255,255,0.05)", borderRadius: 4, background: "rgba(30,30,30,0.6)", padding: 8, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 60 }}>
                    <div style={{ width: "80%" }}>
                      <div style={{ height: 8, width: "33%", borderRadius: 4, background: "rgba(255,255,255,0.2)" }} />
                      <div style={{ height: 32, borderRadius: 4, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", marginTop: 6 }} />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, marginTop: 4 }}>
                        <div style={{ height: 24, borderRadius: 4, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
                        <div style={{ height: 24, borderRadius: 4, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notion */}
              <div style={{ position: "absolute", overflow: "hidden", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(25,25,25,0.95)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)", transition: winTransition, ...getWindowStyle("notion", activeId) }}>
                <WinChrome title="Notion — Product Spec" />
                <div style={{ padding: 16, fontSize: 9, color: "#ccc", userSelect: "none" }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#fff", fontFamily: "monospace" }}>📝 Core Tasks</span>
                  <ul style={{ marginTop: 8, listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                    <li style={{ display: "flex", alignItems: "center", gap: 6, color: "#999" }}>
                      <span style={{ display: "flex", width: 14, height: 14, alignItems: "center", justifyContent: "center", borderRadius: 4, border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.1)", fontSize: 8, color: "#34d399" }}>✓</span>
                      Audit Accessibility window API polling
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 6, color: "#999" }}>
                      <span style={{ display: "flex", width: 14, height: 14, alignItems: "center", justifyContent: "center", borderRadius: 4, border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.1)", fontSize: 8, color: "#34d399" }}>✓</span>
                      Carbon global hotkey integrations
                    </li>
                    <li style={{ display: "flex", alignItems: "center", gap: 6, color: "#999" }}>
                      <span style={{ display: "flex", width: 14, height: 14, alignItems: "center", justifyContent: "center", borderRadius: 4, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)" }} />
                      Window focus restoration
                    </li>
                  </ul>
                </div>
              </div>

              {/* Spotify */}
              <div style={{ position: "absolute", overflow: "hidden", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(18,18,18,0.95)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)", transition: winTransition, ...getWindowStyle("spotify", activeId) }}>
                <WinChrome title="Spotify" />
                <div style={{ padding: 12, display: "flex", alignItems: "center", gap: 12, userSelect: "none", textAlign: "left" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 4, background: "linear-gradient(135deg, #3b82f6, #6366f1)", boxShadow: "0 4px 12px rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Music style={{ width: 20, height: 20, color: "#fff" }} />
                  </div>
                  <div style={{ flex: 1, overflow: "hidden" }}>
                    <div style={{ fontSize: 10, fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Focus Beats</div>
                    <div style={{ fontSize: 8, color: "#777", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Lo-Fi Desktop</div>
                    <div style={{ marginTop: 6, height: 4, width: "100%", borderRadius: 2, background: "#262626" }}>
                      <div style={{ height: "100%", width: "40%", borderRadius: 2, background: "#22c55e" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Telegram */}
              <div style={{ position: "absolute", overflow: "hidden", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(23,33,43,0.95)", boxShadow: "0 10px 30px rgba(0,0,0,0.4)", transition: winTransition, ...getWindowStyle("telegram", activeId) }}>
                <WinChrome title="Telegram" />
                <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8, fontSize: 9, userSelect: "none", textAlign: "left" }}>
                  <div style={{ alignSelf: "flex-end", borderRadius: 8, background: "#2B5278", padding: "6px 10px", color: "#fff", maxWidth: "80%", lineHeight: 1.6 }}>
                    Can you restore my window layouts immediately?
                  </div>
                  <div style={{ alignSelf: "flex-start", borderRadius: 8, background: "#182533", padding: "6px 10px", color: "#ccc", maxWidth: "80%", border: "1px solid rgba(255,255,255,0.05)", lineHeight: 1.6 }}>
                    Done! ⌃⌘1 triggered. Safari, VS Code and Terminal are back in place.
                  </div>
                </div>
              </div>
            </div>

            {/* ═══════ POPOVER ═══════ */}
            {popoverOpen && (
              <div
                style={{
                  position: "absolute",
                  top: 34,
                  right: 12,
                  zIndex: 40,
                  width: 310,
                  userSelect: "none",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.06)",
                  boxShadow: "0 25px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
                  background: "linear-gradient(180deg, rgba(40,40,42,0.85) 0%, rgba(20,20,22,0.85) 100%)",
                  backdropFilter: "blur(24px) saturate(150%)",
                  padding: "12px 14px",
                }}
              >
                {/* Header */}
                <div style={{ marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "#fff", letterSpacing: "0.03em" }}>SnapState</span>
                  <button style={{ display: "flex", width: 24, height: 24, alignItems: "center", justifyContent: "center", borderRadius: 6, background: "transparent", border: "none", color: "#999", cursor: "pointer" }}>
                    <Plus style={{ width: 14, height: 14 }} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Workspace grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {WORKSPACES.map((w) => {
                    const IconComp = w.icon
                    const isActive = activeId === w.id
                    return (
                      <button
                        key={w.id}
                        type="button"
                        onPointerDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          doRestore(w.id)
                        }}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: 4,
                          borderRadius: 12,
                          padding: 10,
                          textAlign: "left",
                          cursor: "pointer",
                          border: isActive || (cursorState.isHoveringDev && w.id === "dev") ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.03)",
                          background: isActive || (cursorState.isHoveringDev && w.id === "dev") ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.03)",
                          color: "#fff",
                          outline: "none",
                          transition: "all 0.15s ease",
                          fontFamily: "inherit",
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive && !(cursorState.isHoveringDev && w.id === "dev")) {
                            e.currentTarget.style.background = "rgba(255,255,255,0.06)"
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive && !(cursorState.isHoveringDev && w.id === "dev")) {
                            e.currentTarget.style.background = "rgba(255,255,255,0.03)"
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.03)"
                          }
                        }}
                      >
                        <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                          <IconComp style={{ width: 14, height: 14, color: isActive ? "#fff" : "#ccc" }} strokeWidth={2} />
                          <span style={{ fontFamily: "monospace", fontSize: 8, fontWeight: 500, color: "#777", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", padding: "2px 4px", borderRadius: 4 }}>
                            {w.shortcut}
                          </span>
                        </div>
                        <span style={{ marginTop: 4, fontSize: 11.5, fontWeight: 600, letterSpacing: "-0.01em", color: isActive ? "#fff" : "#ddd" }}>
                          {w.name}
                        </span>
                        <span style={{ fontSize: 10, color: "#999" }}>
                          {w.windowsCount} windows
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Footer */}
                <div style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 8, fontSize: 10, color: "#999" }}>
                  <span style={{ cursor: "pointer" }}>Settings</span>
                  <span style={{ cursor: "pointer" }}>Quit</span>
                </div>
              </div>
            )}
            
            {/* Fake Cursor for Attract Mode */}
            <div
              style={{
                position: "absolute",
                top: cursorState.y,
                right: cursorState.x,
                opacity: cursorState.opacity,
                transform: `scale(${cursorState.scale})`,
                transition: "all 0.6s cubic-bezier(0.25,1,0.5,1), transform 0.1s ease",
                zIndex: 100,
                pointerEvents: "none"
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 3.21V20.8C5.5 21.45 6.27 21.8 6.75 21.36L11.44 17.06H17.5C18.05 17.06 18.5 16.61 18.5 16.06V15.93L5.5 3.21Z" fill="black" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Inline keyframes ─── */}
      <style>{`
        @keyframes glint-sweep {
          0% { transform: rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: rotate(360deg); opacity: 0; }
        }
        @keyframes pulse { 50% { opacity: 0 } }
      `}</style>
    </div>
  )
}
