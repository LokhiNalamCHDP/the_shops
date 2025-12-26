import SiteHeader from '../components/SiteHeader'

export default function Events() {
  return (
    <div className="min-h-screen bg-palette-white text-neutral-900">
      <SiteHeader />

      <main>
        <section className="bg-palette-white">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="text-xs font-semibold tracking-[0.25em] text-palette-darkCyan">EVENTS</div>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">Events</h1>
            <div className="mt-4 h-1 w-16 rounded-full bg-palette-bronze" aria-hidden="true" />
            <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-700">
              Upcoming events and happenings at The Shops at Lake Havasu.
            </p>

            <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
              Events content coming soon.
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
