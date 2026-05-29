"use client"

const links = [
  { label: "Features", href: "#core-engine" },
  { label: "Architecture", href: "#architecture" },
]

export function Nav() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(10,10,10,0.8)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <nav
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          height: 56,
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="/app-icon.png"
            alt="SnapState logo"
            style={{ width: 24, height: 24, objectFit: "contain" }}
          />
          <span style={{ fontSize: 14, fontWeight: 500, color: "#e5e5e5", letterSpacing: "-0.01em" }}>
            SnapState
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: 14,
                color: "#888",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e5e5e5")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
            >
              {link.label}
            </a>
          ))}

          <a
            href="https://github.com/SoulSniper-V2/SnapState/releases/download/v2.3.1/SnapState.dmg"
            style={{
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.02)",
              padding: "6px 14px",
              fontSize: 13,
              fontWeight: 500,
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
            Download
          </a>
        </div>
      </nav>
    </header>
  )
}
