export default function SiteFooter() {
  return (
    <footer className="border-t border-palette-darkCyan/15 bg-[rgb(128_174_179)] text-white">
      <div className="w-full px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <div className="h-10 w-1 rounded-full bg-palette-bronze" aria-hidden="true" />
              <div className="leading-tight">
                <div className="text-sm font-extrabold tracking-[0.2em]">THE SHOPS</div>
                <div className="text-[11px] font-semibold tracking-[0.25em] text-white/85">AT LAKE HAVASU</div>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/85">
              Open-air shopping, dining, and events in the heart of Lake Havasu City.
            </p>

            <a
              className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/90 transition hover:bg-white/15 hover:text-white"
              href="https://www.facebook.com/theshopsatlakehavasu/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M22 12.06C22 6.504 17.523 2 12 2S2 6.504 2 12.06c0 5.022 3.657 9.19 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.776-1.63 1.57v1.887h2.773l-.443 2.91h-2.33V22c4.78-.75 8.437-4.918 8.437-9.94z"
                />
              </svg>
            </a>
          </div>

          <div className="lg:col-span-4">
            <div className="text-xs font-semibold tracking-[0.25em] text-white/85">QUICK LINKS</div>
            <div className="mt-4 grid gap-2 text-sm font-semibold">
              <a className="text-white/85 hover:text-white" href="/">Home</a>
              <a className="text-white/85 hover:text-white" href="/directory">Stores</a>
              <a className="text-white/85 hover:text-white" href="/events">Events</a>
              <a className="text-white/85 hover:text-white" href="/maps">Maps</a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs font-semibold tracking-[0.25em] text-white/85">CONTACT</div>
            <div className="mt-4 space-y-2 text-sm text-white/85">
              <div>5601 AZ-95 #730, Lake Havasu City, AZ 86404</div>
              <a className="block hover:text-white" href="tel:+19287642400">(928) 764-2400</a>
              <a className="block hover:text-white" href="mailto:admin@theshopslhc.com">admin@theshopslhc.com</a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} The Shops at Lake Havasu. All rights reserved.</div>
          <div className="flex gap-5">
            <a className="hover:text-white" href="/privacy">Privacy</a>
            <a className="hover:text-white" href="/terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
