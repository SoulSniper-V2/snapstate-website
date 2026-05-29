export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 py-8 text-sm text-neutral-500 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} SnapState</p>

        <div className="flex items-center gap-6">
          <a href="#privacy" className="transition-colors hover:text-neutral-300">
            Privacy
          </a>
          <a href="#terms" className="transition-colors hover:text-neutral-300">
            Terms
          </a>
        </div>

        <p className="font-mono text-xs text-neutral-600">Engineered by Arush, age 15</p>
      </div>
    </footer>
  )
}
