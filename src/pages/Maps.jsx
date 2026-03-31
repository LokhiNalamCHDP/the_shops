import { useEffect, useMemo, useRef, useState } from 'react'
import directoryCsv from '../assets/Directory.csv?raw'
import SiteHeader from '../components/SiteHeader'

export default function Maps() {
  const stores = useMemo(() => {
    const slugify = (value) =>
      String(value ?? '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

    const parseLatLngFromGoogleMapsUrl = (url) => {
      if (!url) return null

      const str = String(url)

      const placeMatch = str.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/)
      if (placeMatch) {
        const lat = Number(placeMatch[1])
        const lng = Number(placeMatch[2])
        if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng }
      }

      const atMatch = str.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
      if (!atMatch) return null

      const lat = Number(atMatch[1])
      const lng = Number(atMatch[2])
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null
      return { lat, lng }
    }

    const parseCsvLine = (line) => {
      const out = []
      let current = ''
      let inQuotes = false

      for (let i = 0; i < line.length; i += 1) {
        const ch = line[i]
        if (ch === '"') {
          inQuotes = !inQuotes
          continue
        }
        if (ch === ',' && !inQuotes) {
          out.push(current)
          current = ''
          continue
        }
        current += ch
      }

      out.push(current)
      return out.map((v) => String(v ?? '').trim())
    }

    const normHeader = (h) => String(h ?? '').trim().toLowerCase()

    const lines = String(directoryCsv ?? '')
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean)

    if (lines.length === 0) return []

    const headers = parseCsvLine(lines[0]).map(normHeader)
    const idx = {
      name: headers.indexOf('store'),
      url: headers.indexOf('google maps link') !== -1 ? headers.indexOf('google maps link') : headers.indexOf('google maps'),
      phone: headers.indexOf('phone') !== -1 ? headers.indexOf('phone') : headers.indexOf('contact'),
      hours: headers.indexOf('hours'),
    }

    return lines
      .slice(1)
      .map((line) => {
        const cells = parseCsvLine(line)
        const name = (cells[idx.name] ?? '').trim()
        const placeUrl = (cells[idx.url] ?? '').trim()
        const phone = (idx.phone >= 0 ? (cells[idx.phone] ?? '').trim() : '')
        const hours = (idx.hours >= 0 ? (cells[idx.hours] ?? '').trim() : '')

        if (!name) return null
        const coords = parseLatLngFromGoogleMapsUrl(placeUrl)
        return {
          id: slugify(name) || name,
          name,
          placeUrl,
          phone: phone || '',
          hours: hours || '',
          lat: coords?.lat ?? null,
          lng: coords?.lng ?? null,
        }
      })
      .filter(Boolean)
  }, [])

  const [selectedStoreId, setSelectedStoreId] = useState(stores[0]?.id ?? '')
  const sortedStores = useMemo(
    () =>
      stores
        .slice()
        .sort((a, b) => String(a?.name ?? '').localeCompare(String(b?.name ?? ''), undefined, { sensitivity: 'base' })),
    [stores],
  )
  const selectedStore = useMemo(
    () => stores.find((s) => s.id === selectedStoreId) ?? stores[0],
    [selectedStoreId, stores],
  )

  const mapEmbedSrc = useMemo(() => {
    if (!selectedStore) return 'https://www.google.com/maps?q=The+Shops+at+Lake+Havasu&output=embed'
    if (typeof selectedStore.lat === 'number' && typeof selectedStore.lng === 'number') {
      return `https://www.google.com/maps?q=${selectedStore.lat},${selectedStore.lng}&z=17&output=embed`
    }
    if (selectedStore.placeUrl) {
      const url = String(selectedStore.placeUrl)
      if (url.includes('output=embed')) return url
      return url.includes('?') ? `${url}&output=embed` : `${url}?output=embed`
    }
    return `https://www.google.com/maps?q=${encodeURIComponent(selectedStore.name)}&output=embed`
  }, [selectedStore])

  return (
    <div className="min-h-screen bg-palette-white text-neutral-900">
      <SiteHeader />

      <main>
        <section className="bg-palette-white">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-4">
                <div className="text-xs font-semibold tracking-[0.25em] text-palette-darkCyan">MAPS</div>
                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">Find a store</h1>
                <div className="mt-4 h-1 w-16 rounded-full bg-palette-bronze" aria-hidden="true" />
                <p className="mt-4 text-sm leading-7 text-neutral-700">Select a store from the dropdown or click a store pin on the map.</p>

                <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold text-neutral-900">Stores</div>
                  <div className="mt-3">
                    <select
                      className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900"
                      value={selectedStoreId}
                      onChange={(e) => setSelectedStoreId(e.target.value)}
                    >
                      {sortedStores.map((store) => (
                        <option key={store.id} value={store.id}>
                          {store.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedStore ? (
                    <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-4">
                      <div className="text-base font-extrabold tracking-tight text-neutral-900">{selectedStore.name}</div>

                      {selectedStore.phone ? (
                        <div className="mt-2 text-sm font-semibold text-neutral-700">{selectedStore.phone}</div>
                      ) : null}

                      <div className="mt-4 space-y-3">
                        <a
                          href={selectedStore.placeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-full items-center justify-center rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-50"
                        >
                          Open in Google Maps
                        </a>

                        {/* <button
                          type="button"
                          onClick={() => {
                            setIsDirectionsOpen(true)
                          }}
                          className="inline-flex w-full items-center justify-center rounded-md bg-[rgb(128_174_179)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[rgb(238_156_47)]"
                        >
                          Get Directions
                        </button> */}
                      </div>
                    </div>
                  ) : null}
                </div>

              </div>

              <div className="lg:col-span-8">
                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="relative h-[520px] w-full">
                    <iframe
                      title={selectedStore?.name ? `${selectedStore.name} Map` : 'The Shops at Lake Havasu Map'}
                      className="absolute inset-0 h-full w-full"
                      src={mapEmbedSrc}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5 text-sm text-neutral-700 shadow-sm">
                  Click a store pin on the map or choose a store from the dropdown to view details.
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
