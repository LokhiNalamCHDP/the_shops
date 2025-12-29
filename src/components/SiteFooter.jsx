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
          </div>

          <div className="lg:col-span-4">
            <div className="text-xs font-semibold tracking-[0.25em] text-white/85">QUICK LINKS</div>
            <div className="mt-4 grid gap-2 text-sm font-semibold">
              <a className="text-white/85 hover:text-white" href="#">Home</a>
              <a className="text-white/85 hover:text-white" href="#">Stores</a>
              <a className="text-white/85 hover:text-white" href="#">Events</a>
              <a className="text-white/85 hover:text-white" href="#">Maps</a>
              <a
                className="text-white/85 hover:text-white"
                href="https://www.facebook.com/theshopsatlakehavasu/"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
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
            <a className="hover:text-white" href="#">Privacy</a>
            <a className="hover:text-white" href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
