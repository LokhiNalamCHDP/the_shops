import React, { useMemo } from 'react';
import directoryCsv from '../assets/Directory.csv?raw'
import SiteHeader from '../components/SiteHeader'

const Directory = () => {
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

          return {
            id: slugify(name) || name,
            name,
            category: category || 'Store',
            description: description || '',
            placeUrl,
            phone: phone || '',
            hours: hours || '',
          }
        })
        .filter(Boolean)
    }

    return parse(directoryCsv)
  }, [])

  // Get unique categories
  const categories = [...new Set(stores.map(store => store.category))];

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search stores..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-10 focus:border-palette-bronze focus:outline-none focus:ring-1 focus:ring-palette-bronze"
            />
            <svg
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
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
          
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="rounded-full bg-palette-bronze px-4 py-1.5 text-xs font-medium text-white">
              All Stores
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="rounded-full bg-gray-100 px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stores.map((store) => (
            <div key={store.id} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
              <div className="h-40 bg-gray-100">
                {/* Store image placeholder */}
                <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{store.name}</h3>
                    <span className="mt-1 inline-block rounded-full bg-palette-pearlAqua/20 px-2.5 py-0.5 text-xs font-medium text-palette-pearlAqua">
                      {store.category}
                    </span>
                  </div>
                  <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-600">{store.description}</p>
                {store.phone ? (
                  <div className="mt-2 text-sm font-medium text-gray-700">{store.phone}</div>
                ) : null}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-palette-bronze">View Details</span>
                  <div className="flex space-x-1">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Open
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center gap-4">
              <div className="h-10 w-1 rounded-full bg-palette-bronze" aria-hidden="true" />
              <div className="leading-tight">
                <div className="text-sm font-extrabold tracking-[0.2em]">THE SHOPS</div>
                <div className="text-[11px] font-semibold tracking-[0.25em] text-white/85">AT LAKE HAVASU</div>
              </div>
            </div>
            <div className="mt-4 text-sm text-neutral-400 md:mt-0">
              &copy; {new Date().getFullYear()} The Shops at Lake Havasu. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Directory;
