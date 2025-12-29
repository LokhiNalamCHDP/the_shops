import { useEffect } from 'react'
import SiteHeader from '../components/SiteHeader'

export default function Events() {
  useEffect(() => {
    const appId = import.meta.env?.VITE_FACEBOOK_APP_ID
    const sdkId = 'facebook-jssdk'

    const ensureParsed = () => {
      if (window.FB && typeof window.FB.XFBML?.parse === 'function') {
        window.FB.XFBML.parse()
      }
    }

    if (!document.getElementById('fb-root')) {
      const root = document.createElement('div')
      root.id = 'fb-root'
      document.body.prepend(root)
    }

    if (document.getElementById(sdkId)) {
      ensureParsed()
      return
    }

    const script = document.createElement('script')
    script.id = sdkId
    script.async = true
    script.defer = true
    script.crossOrigin = 'anonymous'

    const base = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v24.0'
    script.src = appId ? `${base}&appId=${encodeURIComponent(appId)}` : base

    script.onload = ensureParsed
    document.body.appendChild(script)
  }, [])

  return (
    <div className="min-h-screen bg-palette-white text-neutral-900">
      <SiteHeader />

      <main>
        <section className="bg-palette-white">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="text-xs font-semibold tracking-[0.25em] text-palette-darkCyan">EVENTS</div>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">Events</h1>
            <div className="mt-4 h-1 w-16 rounded-full bg-palette-bronze" aria-hidden="true" />
            <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-700">
              Upcoming events and happenings at The Shops at Lake Havasu.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-12">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm">
                  Follow our Facebook page for the latest announcements, events, and community updates.
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="p-4 sm:p-6">
                    <div
                      className="fb-page"
                      data-href="https://www.facebook.com/theshopsatlakehavasu/"
                      data-tabs="timeline, events"
                      data-width="700"
                      data-height="1000"
                      data-small-header="false"
                      data-adapt-container-width="true"
                      data-hide-cover="false"
                      data-show-facepile="true"
                    >
                      <blockquote cite="https://www.facebook.com/theshopsatlakehavasu/" className="fb-xfbml-parse-ignore">
                        <a href="https://www.facebook.com/theshopsatlakehavasu/">The Shops at Lake Havasu</a>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
