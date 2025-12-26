import { Link, useLocation } from 'react-router-dom'

export default function SiteHeader({ variant = 'solid' }) {
  const location = useLocation()
  const isOverlay = variant === 'overlay'

  const linkBase = isOverlay ? 'text-white/85 hover:text-white' : 'text-neutral-700 hover:text-neutral-900'
  const linkActive = isOverlay ? 'text-white' : 'text-neutral-900'

  const shellClass = isOverlay ? 'absolute inset-x-0 top-0 z-10' : 'border-b border-neutral-200 bg-white'
  const innerClass = isOverlay
    ? 'mx-auto flex max-w-6xl items-center justify-between px-6 py-5 text-white'
    : 'mx-auto flex max-w-6xl items-center justify-between px-6 py-5'

  const isPath = (path) => location.pathname === path

  return (
    <header className={shellClass}>
      <div className={innerClass}>
        <div className="flex items-center gap-4">
          <div className="h-9 w-1 rounded-full bg-palette-bronze" aria-hidden="true" />
          <div className="leading-tight">
            <div className={isOverlay ? 'text-sm font-extrabold tracking-[0.2em]' : 'text-sm font-extrabold tracking-[0.2em] text-neutral-900'}>
              THE SHOPS
            </div>
            <div
              className={
                isOverlay
                  ? 'text-[11px] font-semibold tracking-[0.25em] text-white/90'
                  : 'text-[11px] font-semibold tracking-[0.25em] text-neutral-600'
              }
            >
              AT LAKE HAVASU
            </div>
          </div>
        </div>

        <nav className={isOverlay ? 'hidden items-center gap-8 text-base font-semibold tracking-wide md:flex' : 'flex items-center gap-6 text-sm font-semibold'}>
          <Link to="/" className={isPath('/') ? linkActive : linkBase}>
            Home
          </Link>
          <Link to="/directory" className={isPath('/directory') ? linkActive : linkBase}>
            Directory
          </Link>
          <Link to="/events" className={isPath('/events') ? linkActive : linkBase}>
            Events
          </Link>
          <Link to="/maps" className={isPath('/maps') ? linkActive : linkBase}>
            Maps
          </Link>
        </nav>
      </div>
    </header>
  )
}
