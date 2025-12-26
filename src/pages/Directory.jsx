import React from 'react';

const Directory = () => {
  // Sample store data - replace with your actual data
  const stores = [
    { id: 1, name: 'Altitude', category: 'Fashion', description: 'Trendy clothing and accessories' },
    { id: 2, name: "Beall's", category: 'Department', description: 'Family fashion and home decor' },
    { id: 3, name: "Dillard's", category: 'Department', description: 'Upscale fashion and home goods' },
    { id: 4, name: 'Great Clips', category: 'Services', description: 'Hair care and styling' },
    { id: 5, name: "JCPenney", category: 'Department', description: 'Apparel, home, and beauty' },
    { id: 6, name: "Maurice's", category: 'Fashion', description: "Women's fashion and accessories" },
    { id: 7, name: 'PetSmart', category: 'Pets', description: 'Pet supplies and services' },
    { id: 8, name: 'Sally Beauty', category: 'Beauty', description: 'Professional beauty supplies' }
  ];

  // Get unique categories
  const categories = [...new Set(stores.map(store => store.category))];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-palette-darkCyan text-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="h-10 w-1 rounded-full bg-palette-bronze" aria-hidden="true" />
            <div className="leading-tight">
              <h1 className="text-2xl font-extrabold tracking-[0.2em]">STORE DIRECTORY</h1>
              <p className="text-sm font-semibold tracking-[0.25em] text-white/85">FIND YOUR FAVORITE STORES</p>
            </div>
          </div>
        </div>
      </header>

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
