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
  const selectedStore = useMemo(
    () => stores.find((s) => s.id === selectedStoreId) ?? stores[0],
    [selectedStoreId, stores],
  )

  const [customerPosition, setCustomerPosition] = useState(null)
  const [geoStatus, setGeoStatus] = useState('loading')
  const [lastUpdatedAt, setLastUpdatedAt] = useState(null)
  const [watchId, setWatchId] = useState(null)
  const [isDirectionsOpen, setIsDirectionsOpen] = useState(false)
  const [departureId, setDepartureId] = useState('current')
  const [customDeparture, setCustomDeparture] = useState(null)

  const mapboxToken = import.meta.env?.VITE_MAPBOX_TOKEN
  const [mapboxState, setMapboxState] = useState({ status: 'idle', mapboxgl: null })
  const mapRef = useRef(null)
  const mapContainerRef = useRef(null)
  const storeMarkersRef = useRef([])
  const storeMarkersByIdRef = useRef(new Map())
  const customerMarkerRef = useRef(null)
  const hasCenteredOnUserRef = useRef(false)

  const startLocationTracking = () => {
    if (!('geolocation' in navigator)) {
      setGeoStatus('unsupported')
      return
    }

    setGeoStatus('loading')

    if (watchId != null) {
      navigator.geolocation.clearWatch(watchId)
      setWatchId(null)
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCustomerPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        })
        setLastUpdatedAt(Date.now())
        setGeoStatus('ready')

        const id = navigator.geolocation.watchPosition(
          (p) => {
            setCustomerPosition({
              lat: p.coords.latitude,
              lng: p.coords.longitude,
              accuracy: p.coords.accuracy,
            })
            setLastUpdatedAt(Date.now())
            setGeoStatus('ready')
          },
          () => {
            setGeoStatus('denied')
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000,
          },
        )

        setWatchId(id)
      },
      () => {
        setGeoStatus('denied')
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      },
    )
  }

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setGeoStatus('unsupported')
      return
    }

    setGeoStatus('idle')
  }, [])

  useEffect(() => {
    return () => {
      if (watchId != null && 'geolocation' in navigator) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [watchId])

  const departureOptions = useMemo(() => {
    return [
      { id: 'current', name: 'Current Location' },
      { id: 'custom', name: customDeparture ? 'Pinned Map Location' : 'Choose On Map' },
      ...stores.map((s) => ({ id: s.id, name: s.name })),
    ]
  }, [stores])

  const directionsUrl = useMemo(() => {
    if (!selectedStore) return ''
    if (typeof selectedStore.lat !== 'number' || typeof selectedStore.lng !== 'number') return ''

    let origin = ''
    if (departureId === 'current') {
      if (!customerPosition) return ''
      origin = `${customerPosition.lat},${customerPosition.lng}`
    } else if (departureId === 'custom') {
      if (!customDeparture) return ''
      origin = `${customDeparture.lat},${customDeparture.lng}`
    } else {
      const fromStore = stores.find((s) => s.id === departureId)
      if (!fromStore) return ''
      if (typeof fromStore.lat !== 'number' || typeof fromStore.lng !== 'number') return ''
      origin = `${fromStore.lat},${fromStore.lng}`
    }

    const destination = `${selectedStore.lat},${selectedStore.lng}`
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=walking`
  }, [customerPosition, customDeparture, departureId, selectedStore, stores])

  const loadMapbox = async () => {
    if (mapboxState.status === 'ready') return mapboxState.mapboxgl
    if (mapboxState.status === 'loading') return null

    setMapboxState({ status: 'loading', mapboxgl: null })

    const existingCss = document.querySelector('link[data-mapbox="true"]')
    if (!existingCss) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.css'
      link.setAttribute('data-mapbox', 'true')
      document.head.appendChild(link)
    }

    const existingScript = document.querySelector('script[data-mapbox="true"]')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.js'
      script.async = true
      script.setAttribute('data-mapbox', 'true')
      document.body.appendChild(script)

      await new Promise((resolve, reject) => {
        script.addEventListener('load', resolve)
        script.addEventListener('error', reject)
      })
    } else if (!window.mapboxgl) {
      await new Promise((resolve, reject) => {
        existingScript.addEventListener('load', resolve)
        existingScript.addEventListener('error', reject)
      })
    }

    if (!window.mapboxgl) {
      setMapboxState({ status: 'error', mapboxgl: null })
      return null
    }

    setMapboxState({ status: 'ready', mapboxgl: window.mapboxgl })
    return window.mapboxgl
  }

  useEffect(() => {
    if (!mapboxToken) return
    if (!mapContainerRef.current) return
    if (mapRef.current) return

    let cancelled = false

    const init = async () => {
      const mapboxgl = await loadMapbox()
      if (!mapboxgl || cancelled) return

      mapboxgl.accessToken = mapboxToken

      const firstWithCoords = stores.find((s) => typeof s.lat === 'number' && typeof s.lng === 'number')
      const center = firstWithCoords ? [firstWithCoords.lng, firstWithCoords.lat] : [-114.3669, 34.5693]
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center,
        zoom: 16.8,
      })

      map.addControl(new mapboxgl.NavigationControl(), 'top-right')

      map.on('click', (e) => {
        const lat = e?.lngLat?.lat
        const lng = e?.lngLat?.lng
        if (typeof lat !== 'number' || typeof lng !== 'number') return
        setCustomDeparture({ lat, lng })
        setDepartureId('custom')
      })

      mapRef.current = map
    }

    init()

    return () => {
      cancelled = true
      if (mapRef.current) {
        try {
          mapRef.current.remove()
        } catch {
          return
        }
        mapRef.current = null
      }
    }
  }, [mapboxToken, stores])

  useEffect(() => {
    const map = mapRef.current
    if (!map || !selectedStore) return
    if (typeof selectedStore.lat !== 'number' || typeof selectedStore.lng !== 'number') return

    map.flyTo({ center: [selectedStore.lng, selectedStore.lat], zoom: 16.8, duration: 600 })
  }, [selectedStore])

  useEffect(() => {
    const marker = storeMarkersByIdRef.current.get(selectedStoreId)
    if (!marker) return

    storeMarkersByIdRef.current.forEach((m, id) => {
      const el = m.getElement()
      if (!el) return
      const isSelected = id === selectedStoreId
      el.style.width = isSelected ? '26px' : '18px'
      el.style.height = isSelected ? '26px' : '18px'
      el.style.background = isSelected ? '#F59E0B' : '#DB2777'
      el.style.border = isSelected ? '4px solid #111827' : '3px solid #ffffff'
      el.style.boxShadow = isSelected ? '0 10px 22px rgba(0,0,0,0.28)' : '0 6px 16px rgba(0,0,0,0.18)'
      el.style.transform = isSelected ? 'translateY(-2px)' : 'translateY(0px)'
    })
  }, [selectedStoreId])

  useEffect(() => {
    const map = mapRef.current
    const mapboxgl = mapboxState.mapboxgl
    if (!map || !mapboxgl) return

    storeMarkersRef.current.forEach((m) => {
      try {
        m.remove()
      } catch {
        return
      }
    })
    storeMarkersRef.current = []
    storeMarkersByIdRef.current = new Map()

    stores.forEach((store) => {
      if (typeof store.lat !== 'number' || typeof store.lng !== 'number') return
      const el = document.createElement('button')
      el.type = 'button'
      el.setAttribute('aria-label', store.name)
      el.style.width = '18px'
      el.style.height = '18px'
      el.style.borderRadius = '9999px'
      el.style.background = '#DB2777'
      el.style.border = '3px solid #ffffff'
      el.style.boxShadow = '0 6px 16px rgba(0,0,0,0.18)'
      el.style.cursor = 'pointer'

      el.addEventListener('click', (e) => {
        e.preventDefault()
        setSelectedStoreId(store.id)
      })

      const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
        .setLngLat([store.lng, store.lat])
        .addTo(map)

      storeMarkersRef.current.push(marker)
      storeMarkersByIdRef.current.set(store.id, marker)
    })

    const selectedMarker = storeMarkersByIdRef.current.get(selectedStoreId)
    if (selectedMarker) {
      const el = selectedMarker.getElement()
      if (el) {
        el.style.width = '26px'
        el.style.height = '26px'
        el.style.background = '#F59E0B'
        el.style.border = '4px solid #111827'
        el.style.boxShadow = '0 10px 22px rgba(0,0,0,0.28)'
        el.style.transform = 'translateY(-2px)'
      }
    }

    return () => {
      storeMarkersRef.current.forEach((m) => {
        try {
          m.remove()
        } catch {
          return
        }
      })
      storeMarkersRef.current = []
      storeMarkersByIdRef.current = new Map()
    }
  }, [mapboxState.mapboxgl, selectedStoreId, stores])

  useEffect(() => {
    const map = mapRef.current
    const mapboxgl = mapboxState.mapboxgl
    if (!map || !mapboxgl) return

    if (!customerPosition) return

    if (customerMarkerRef.current) {
      customerMarkerRef.current.setLngLat([customerPosition.lng, customerPosition.lat])

      if (!hasCenteredOnUserRef.current) {
        map.flyTo({ center: [customerPosition.lng, customerPosition.lat], zoom: 16.8, duration: 600 })
        hasCenteredOnUserRef.current = true
      }
      return
    }

    const el = document.createElement('div')
    el.style.width = '18px'
    el.style.height = '18px'
    el.style.borderRadius = '9999px'
    el.style.background = '#60A5FA'
    el.style.border = '3px solid #111827'
    el.style.boxShadow = '0 6px 16px rgba(0,0,0,0.18)'

    customerMarkerRef.current = new mapboxgl.Marker({ element: el, anchor: 'center' })
      .setLngLat([customerPosition.lng, customerPosition.lat])
      .addTo(map)

    if (!hasCenteredOnUserRef.current) {
      map.flyTo({ center: [customerPosition.lng, customerPosition.lat], zoom: 16.8, duration: 600 })
      hasCenteredOnUserRef.current = true
    }

    return () => {
      if (customerMarkerRef.current) {
        try {
          customerMarkerRef.current.remove()
        } catch {
          return
        }
        customerMarkerRef.current = null
      }
    }
  }, [customerPosition, mapboxState.mapboxgl])

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
                      {stores.map((store) => (
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

                <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold text-neutral-900">Your location</div>

                  {geoStatus === 'ready' && customerPosition ? (
                    <div className="mt-2 space-y-1 text-sm text-neutral-700">
                      <button
                        type="button"
                        onClick={() => {
                          const map = mapRef.current
                          if (!map) return
                          map.flyTo({ center: [customerPosition.lng, customerPosition.lat], zoom: 16.8, duration: 600 })
                          hasCenteredOnUserRef.current = true
                        }}
                        className="mb-2 inline-flex w-full items-center justify-center rounded-md bg-[rgb(128_174_179)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[rgb(238_156_47)]"
                      >
                        Show My Location on Map
                      </button>
                      <div>
                        <span className="font-semibold text-neutral-900">Lat:</span> {customerPosition.lat.toFixed(6)}
                      </div>
                      <div>
                        <span className="font-semibold text-neutral-900">Lng:</span> {customerPosition.lng.toFixed(6)}
                      </div>
                      {typeof customerPosition.accuracy === 'number' ? (
                        <div>
                          <span className="font-semibold text-neutral-900">Accuracy:</span> {Math.round(customerPosition.accuracy)} m
                        </div>
                      ) : null}
                      {lastUpdatedAt ? (
                        <div className="text-xs text-neutral-500">Updated {new Date(lastUpdatedAt).toLocaleTimeString()}</div>
                      ) : null}
                    </div>
                  ) : geoStatus === 'denied' ? (
                    <div className="mt-2 space-y-3">
                      <div className="text-sm text-neutral-700">Location permission is required to use Current Location.</div>
                      <button
                        type="button"
                        onClick={startLocationTracking}
                        className="inline-flex w-full items-center justify-center rounded-md bg-[rgb(128_174_179)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[rgb(238_156_47)]"
                      >
                        Retry Enable Location
                      </button>
                    </div>
                  ) : geoStatus === 'unsupported' ? (
                    <div className="mt-2 text-sm text-neutral-700">Geolocation is not supported in this browser.</div>
                  ) : geoStatus === 'idle' ? (
                    <div className="mt-2 space-y-3">
                      <div className="text-sm text-neutral-700">Enable location to use Current Location as your departure.</div>
                      <button
                        type="button"
                        onClick={startLocationTracking}
                        className="inline-flex w-full items-center justify-center rounded-md bg-[rgb(128_174_179)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[rgb(238_156_47)]"
                      >
                        Enable Location
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2 text-sm text-neutral-700">Getting your location…</div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="relative h-[520px] w-full">
                    {!mapboxToken ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 p-6 text-center">
                        <div className="max-w-md">
                          <div className="text-sm font-semibold tracking-wide text-neutral-500">MAPBOX REQUIRED</div>
                          <div className="mt-2 text-lg font-extrabold text-neutral-900">Missing Mapbox token</div>
                          <div className="mt-2 text-sm text-neutral-700">
                            Add <span className="font-semibold">VITE_MAPBOX_TOKEN</span> to your <span className="font-semibold">.env</span> file and restart the dev server.
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div ref={mapContainerRef} className="absolute inset-0 h-full w-full" style={{ minHeight: 520 }} />
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5 text-sm text-neutral-700 shadow-sm">
                  Click a store pin on the map or choose a store from the dropdown to view details.
                </div>
              </div>
            </div>
          </div>
        </section>

        {isDirectionsOpen && selectedStore ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold tracking-wide text-neutral-500">DIRECTIONS</div>
                  <div className="mt-1 text-xl font-extrabold text-neutral-900">{selectedStore.name}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDirectionsOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="mt-5">
                <div className="text-sm font-semibold text-neutral-900">Choose departure</div>
                <div className="mt-2">
                  <select
                    className="w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900"
                    value={departureId}
                    onChange={(e) => setDepartureId(e.target.value)}
                  >
                    {departureOptions.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </div>

                {departureId === 'current' && !customerPosition ? (
                  <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                    Current Location is not available yet. Please enable location.
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={startLocationTracking}
                        className="inline-flex w-full items-center justify-center rounded-md bg-[rgb(128_174_179)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[rgb(238_156_47)]"
                      >
                        Enable Location
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setIsDirectionsOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <a
                  href={directionsUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors ${
                    directionsUrl ? 'bg-[rgb(128_174_179)] hover:bg-[rgb(238_156_47)]' : 'cursor-not-allowed bg-neutral-400'
                  }`}
                  aria-disabled={!directionsUrl}
                  onClick={(e) => {
                    if (!directionsUrl) e.preventDefault()
                  }}
                >
                  Open Route
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}
