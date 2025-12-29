import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom'
import directoryCsv from '../assets/Directory.csv?raw'
import SiteHeader from '../components/SiteHeader'
import altitudeLogo from '../assets/images/logos/altitude.png'
import beallsLogo from '../assets/images/logos/bealls.webp'
import buffaloWildWingsLogo from '../assets/images/logos/buffalowildwings.png'
import convergenceHealthLogo from '../assets/images/logos/convergencehealth.png'
import dillardsLogo from '../assets/images/logos/dillards.png'
import dollarTreeLogo from '../assets/images/logos/dollartree.webp'
import famousFootwearLogo from '../assets/images/logos/famousfootwearlogo.png'
import frozenSpoonLogo from '../assets/images/logos/frozenspoon.webp'
import gameStopLogo from '../assets/images/logos/gamestop.png'
import greatClipsLogo from '../assets/images/logos/greatclips.png'
import jcpenneyLogo from '../assets/images/logos/jcpenney.png'
import kayJewelersLogo from '../assets/images/logos/kayjewellers.png'
import mauricesLogo from '../assets/images/logos/maurices.webp'
import northsideGrillLogo from '../assets/images/logos/northsidegrill.png'
import petsmartLogo from '../assets/images/logos/petsmart.png'
import sallyLogo from '../assets/images/logos/sally.webp'
import sunshineIndoorPlayLogo from '../assets/images/logos/sunshineindoorplay.png'
import tmobileLogo from '../assets/images/logos/tmobile.png'
import SiteFooter from '../components/SiteFooter'

const Directory = () => {
  const location = useLocation()

  const categoryOptions = useMemo(
    () => [
      { id: 'all', label: 'All stores' },
      { id: 'Dining', label: 'Dining' },
      { id: 'Shopping', label: 'Shopping' },
      { id: 'Entertainment', label: 'Entertainment' },
      { id: 'Healthcare', label: 'Healthcare' },
      { id: 'Services', label: 'Services' },
    ],
    [],
  )

  const websiteByStoreId = useMemo(
    () => ({
      'altitude-trampoline-park': 'https://www.altitudetrampolinepark.com/locations/arizona/lake-havasu-city/5601-highway-95-n/',
      'bealls': 'https://stores.bealls.com/az/lake-havasu/5601-highway-95-n',
      'buffalo-wild-wings': 'https://www.buffalowildwings.com/locations/us/az/lake-havasu-city/',
      'convergence-health': 'https://convergencehealth.com/locations/lake-havasu',
      'dillard-s': 'https://www.dillards.com/stores/arizona/the-shops-at-lake-havasu-lake-havasu-city/0912',
      'dollar-tree': 'https://locations.dollartree.com/az/lake-havasu/5601-highway-95-n',
      'famous-footwear': 'https://www.famousfootwear.com/stores/az/lake-havasu/86404/the-shops-at-lake-havasu-02753',
      'frozen-spoon': 'https://frozenspoonyogurt.com/contact-us',
      'gamestop': 'https://www.gamestop.com/store/us/az/lake-havasu-city/6128/shops-at-lake-havasu-gamestop',
      'great-clips': 'https://salons.greatclips.com/us/az/lake-havasu/5601-hwy-95-n',
      'jcpenny': 'https://www.jcpenney.com/locations/az/lakehavasucity/clothing-stores-lakehavasucity-az-2940.html',
      'kay-jewelers': 'https://stores.kay.com/az/lake-havasu-city/2826',
      'maurices': 'https://locations.maurices.com/us/az/lake-havasu-city/5601-hwy-95-n',
      'northside-grill': 'https://www.facebook.com/p/Northside-Grill-100092231486833/',
      'petsmart': 'https://www.petsmart.com/stores/us/az/lake-havasu-city-store1902.html',
      'sally-beauty': 'https://stores.sallybeauty.com/az/lkhavasucity/beauty-supply-lkhavasucity-az-3690.html',
      'star-cinemas': 'https://starcinemashavasu.com/',
      'sunshine-indoor-play': 'https://www.sunshineindoorplay.com/',
      't-mobile': 'https://www.t-mobile.com/stores/bd/t-mobile-lake-havasu-city-az-86404-464g',
    }),
    [],
  )

  const logoByStoreId = useMemo(
    () => ({
      altitude: altitudeLogo,
      'altitude-trampoline-park': altitudeLogo,
      "bealls": beallsLogo,
      'buffalo-wild-wings': buffaloWildWingsLogo,
      'convergence-health': convergenceHealthLogo,
      "dillards": dillardsLogo,
      "dillard-s": dillardsLogo,
      'dollar-tree': dollarTreeLogo,
      'famous-footwear': famousFootwearLogo,
      'frozen-spoon': frozenSpoonLogo,
      'gamestop': gameStopLogo,
      "greatclips": greatClipsLogo,
      'great-clips': greatClipsLogo,
      "jcpenney": jcpenneyLogo,
      'jcpenny': jcpenneyLogo,
      'kay-jewelers': kayJewelersLogo,
      "maurices": mauricesLogo,
      'northside-grill': northsideGrillLogo,
      "petsmart": petsmartLogo,
      "sally": sallyLogo,
      'sally-beauty': sallyLogo,
      'sunshine-indoor-play': sunshineIndoorPlayLogo,
      't-mobile': tmobileLogo,
    }),
    [],
  )

  const normalizedCategoryByStoreId = useMemo(
    () => ({
      'buffalo-wild-wings': 'Dining',
      'northside-grill': 'Dining',
      'frozen-spoon': 'Dining',

      'altitude-trampoline-park': 'Entertainment',
      'sunshine-indoor-play': 'Services',
      'star-cinemas': 'Entertainment',

      'convergence-health': 'Healthcare',

      'great-clips': 'Services',
      't-mobile': 'Services',

      // Everything else defaults to Shopping
    }),
    [],
  )

  const stores = useMemo(() => {
    const slugify = (value) =>
      String(value ?? '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

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

    const parse = (csvText) => {
      const lines = String(csvText ?? '')
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
        category: headers.indexOf('category'),
        description: headers.indexOf('description'),
      }

      return lines
        .slice(1)
        .map((line) => {
          const cells = parseCsvLine(line)
          const name = (cells[idx.name] ?? '').trim()
          const placeUrl = (cells[idx.url] ?? '').trim()
          const phone = (idx.phone >= 0 ? (cells[idx.phone] ?? '').trim() : '')
          const hours = (idx.hours >= 0 ? (cells[idx.hours] ?? '').trim() : '')
          const category = (idx.category >= 0 ? (cells[idx.category] ?? '').trim() : '')
          const description = (idx.description >= 0 ? (cells[idx.description] ?? '').trim() : '')

          if (!name) return null

          const normalizeCategory = (rawCategory, storeId) => {
            const raw = String(rawCategory ?? '').trim().toLowerCase()
            if (raw) {
              if (raw.includes('dining') || raw.includes('food')) return 'Dining'
              if (raw.includes('entertain')) return 'Entertainment'
              if (raw.includes('health')) return 'Healthcare'
              if (raw.includes('service')) return 'Services'
              if (raw.includes('shop')) return 'Shopping'
            }
            return normalizedCategoryByStoreId[storeId] || 'Shopping'
          }

          const id = slugify(name) || name
          const normalizedCategory = normalizeCategory(category, id)

          return {
            id,
            name,
            category: normalizedCategory,
            description: description || '',
            placeUrl,
            phone: phone || '',
            hours: hours || '',
          }
        })
        .filter(Boolean)
    }

    return parse(directoryCsv)
  }, [normalizedCategoryByStoreId])

  const initialCategoryFromUrl = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const raw = (params.get('category') ?? '').trim()
    if (!raw) return 'all'
    const found = categoryOptions.find((c) => String(c.id).toLowerCase() === raw.toLowerCase())
    return found ? found.id : 'all'
  }, [categoryOptions, location.search])

  const [activeCategory, setActiveCategory] = useState(initialCategoryFromUrl)
  const [query, setQuery] = useState('')

  useEffect(() => {
    setActiveCategory(initialCategoryFromUrl)
  }, [initialCategoryFromUrl])

  const filteredStores = useMemo(() => {
    const q = query.trim().toLowerCase()

    return stores
      .filter((store) => {
        if (activeCategory !== 'all' && store.category !== activeCategory) return false
        if (!q) return true

        const haystack = [store.name, store.category, store.description, store.phone, store.hours]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
        return haystack.includes(q)
      })
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [activeCategory, query, stores])

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900">Our All Stores</h1>
          <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-neutral-700">
            Click a store to view store hours.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setActiveCategory(opt.id)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                    activeCategory === opt.id
                      ? 'border-[rgb(128_174_179)] bg-[rgb(128_174_179)] text-white'
                      : 'border-neutral-300 bg-white text-neutral-700 hover:border-[rgb(128_174_179)]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-[320px]">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search stores..."
                className="w-full rounded-full border border-neutral-300 bg-white px-4 py-2 pl-10 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
              />
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStores.map((store) => (
            <div key={store.id} className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <a
                href={websiteByStoreId[store.id] || undefined}
                target={websiteByStoreId[store.id] ? '_blank' : undefined}
                rel={websiteByStoreId[store.id] ? 'noreferrer' : undefined}
                className="m-4 flex h-44 items-center justify-center rounded-2xl bg-white"
              >
                {logoByStoreId[store.id] ? (
                  <img
                    src={logoByStoreId[store.id]}
                    alt={store.name}
                    className="h-40 w-40 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <svg className="h-14 w-14 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4-4a3 5 0 014 0l4 4m-8-6l2-2a3 5 0 014 0l4 4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </a>

              <div className="mx-4 h-px bg-neutral-200" aria-hidden="true" />

              <div className="px-5 py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    {websiteByStoreId[store.id] ? (
                      <a
                        href={websiteByStoreId[store.id]}
                        target="_blank"
                        rel="noreferrer"
                        className="block truncate text-base font-semibold text-neutral-900 hover:underline"
                      >
                        {store.name}
                      </a>
                    ) : (
                      <div className="truncate text-base font-semibold text-neutral-900">{store.name}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Directory;
