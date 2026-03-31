import londonBridgeImg from './assets/images/london-bridge.jpg'
import shopsbg from './assets/images/shopsbg.png'
import hotAirBalloon from './assets/images/hotairballoon.jpg'
import hotAirBalloonOnWater from './assets/images/hotairballoononwater.jpg'
import qwe from './assets/images/qwe.jpg'
import foodAndDrinksImg from './assets/images/food_and_drinks.jpg'
import shopsImg from './assets/images/shops.jpg'
import eventsAndOffersImg from './assets/images/events_and_offers.jpg'
import stateParkImg from './assets/images/LAKE HAVASU STATE PARK.png'
import lakeHavasuMedicalCenterImg from './assets/images/Lake Havasu Medical Center.jpg'
import shopsAtHavasuAerialImg from './assets/images/ShopsAtHavasuAerial.webp'
import shopsAtHavasuLongImg from './assets/images/ShopsAtHavasuLong.png'
import movie1Img from './assets/images/movies/1.webp'
import movie2Img from './assets/images/movies/2.webp'
import movie3Img from './assets/images/movies/3.jpg'
import movie4Img from './assets/images/movies/4.png'
import movie5Img from './assets/images/movies/5.webp'
import altitudeLogo from './assets/images/logos/altitude.png'
import beallsLogo from './assets/images/logos/bealls.webp'
import dillardsLogo from './assets/images/logos/dillards.png'
import greatClipsLogo from './assets/images/logos/greatclips.png'
import jcpenneyLogo from './assets/images/logos/jcpenney.png'
import mauricesLogo from './assets/images/logos/maurices.webp'
import petsmartLogo from './assets/images/logos/petsmart.png'
import sallyLogo from './assets/images/logos/sally.webp'

import { useEffect, useMemo, useRef, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Directory from './pages/Directory'
import Maps from './pages/Maps'
import Events from './pages/Events'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'

const HERO_IMAGE = shopsbg

function IconMenu(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  )
}

function IconUser(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function IconArrowRight(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  )
}

function getWeatherLabelFromCode(code) {
  const c = Number(code)

  if (Number.isNaN(c)) return 'Weather'
  if (c === 0) return 'Clear'
  if (c === 1 || c === 2) return 'Mostly clear'
  if (c === 3) return 'Cloudy'
  if (c === 45 || c === 48) return 'Fog'
  if ((c >= 51 && c <= 57) || (c >= 61 && c <= 67)) return 'Rain'
  if (c >= 71 && c <= 77) return 'Snow'
  if (c >= 80 && c <= 82) return 'Showers'
  if (c >= 95) return 'Storms'

  return 'Weather'
}

function getWeatherIconTypeFromCode(code) {
  const c = Number(code)

  if (Number.isNaN(c)) return 'cloud'
  if (c === 0) return 'sun'
  if (c === 1 || c === 2 || c === 3) return 'cloud'
  if (c === 45 || c === 48) return 'cloud'
  if ((c >= 51 && c <= 57) || (c >= 61 && c <= 67) || (c >= 80 && c <= 82)) return 'rain'
  if (c >= 71 && c <= 77) return 'cloud'
  if (c >= 95) return 'rain'

  return 'cloud'
}

function WeatherIcon({ type, className }) {
  if (type === 'sun') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="M4.93 4.93l1.41 1.41" />
        <path d="M17.66 17.66l1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="M4.93 19.07l1.41-1.41" />
        <path d="M17.66 6.34l1.41-1.41" />
      </svg>
    )
  }

  if (type === 'rain') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        <path d="M7 15a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.6 1.7A3.5 3.5 0 0 1 18.5 15H7z" />
        <path d="M8 19l-1 2" />
        <path d="M12 19l-1 2" />
        <path d="M16 19l-1 2" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7 15a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.6 1.7A3.5 3.5 0 0 1 18.5 15H7z" />
    </svg>
  )
}

function AppContent() {
  const typeWords = useMemo(() => ['shopping', 'fun', 'dining', 'movies', 'games'], [])
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const leasingSlides = useMemo(() => [shopsAtHavasuAerialImg, shopsAtHavasuLongImg], [])
  const [leasingIndex, setLeasingIndex] = useState(0)
  const [isLeasingModalOpen, setIsLeasingModalOpen] = useState(false)

  const [feedbackName, setFeedbackName] = useState('')
  const [feedbackEmail, setFeedbackEmail] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [feedbackError, setFeedbackError] = useState('')
  const [feedbackSuccess, setFeedbackSuccess] = useState('')
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false)

  const [weather, setWeather] = useState({ status: 'loading', tempF: null, label: '', code: null })

  const balloonSectionRef = useRef(null)
  const [balloonParallaxY, setBalloonParallaxY] = useState(0)

  const featureCards = useMemo(
    () => [
      { title: 'Food and Drinks', cta: 'Discover More', image: foodAndDrinksImg },
      { title: 'Shops', cta: 'Discover More', image: shopsImg },
      { title: 'Events', cta: 'Discover More', image: eventsAndOffersImg },
    ],
    [],
  )

  const marqueeLogos = useMemo(
    () => [
      { src: altitudeLogo, alt: 'Altitude' },
      { src: beallsLogo, alt: "Bealls" },
      { src: dillardsLogo, alt: "Dillard's" },
      { src: greatClipsLogo, alt: 'Great Clips' },
      { src: jcpenneyLogo, alt: 'JCPenney' },
      { src: mauricesLogo, alt: "Maurices" },
      { src: petsmartLogo, alt: 'PetSmart' },
      { src: sallyLogo, alt: 'Sally Beauty' },
    ],
    [],
  )

  const movieSlides = useMemo(
    () => [
      { title: 'Movie 1', image: movie1Img },
      { title: 'Movie 2', image: movie2Img },
      { title: 'Movie 3', image: movie3Img },
      { title: 'Movie 4', image: movie4Img },
      { title: 'Movie 5', image: movie5Img },
    ],
    [],
  )

  const [movieIndex, setMovieIndex] = useState(0)
  const [isMoviePaused, setIsMoviePaused] = useState(false)

  const sendFeedback = async () => {
    const name = feedbackName.trim()
    const email = feedbackEmail.trim()
    const message = feedbackMessage.trim()

    if (!message) {
      setFeedbackSuccess('')
      setFeedbackError('Please enter your feedback message.')
      return
    }

    setFeedbackError('')
    setFeedbackSuccess('')
    setFeedbackSubmitting(true)

    try {
      const res = await fetch('https://script.google.com/macros/s/AKfycbxbE6lPp30mGPgdI_oZfZGWpNdUG5xJgSi1r2bw6tH81QVQWHi2epUk2b40swVFbS7muw/exec', {
        method: 'POST',
        body: JSON.stringify({ name, email, message }),
      })

      const text = await res.text().catch(() => '')
      const json = (() => {
        if (!text) return null
        try {
          return JSON.parse(text)
        } catch {
          return null
        }
      })()

      if (!res.ok) throw new Error(json?.error || `Request failed (${res.status})`)

      if (json?.result && json.result !== 'success') throw new Error(json?.error || 'Submission failed')

      setFeedbackName('')
      setFeedbackEmail('')
      setFeedbackMessage('')
      setFeedbackSuccess('Feedback sent. Thank you!')
    } catch (err) {
      setFeedbackError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setFeedbackSubmitting(false)
    }
  }

  const goMoviePrev = () => {
    setMovieIndex((i) => (i - 1 + movieSlides.length) % movieSlides.length)
  }

  const goMovieNext = () => {
    setMovieIndex((i) => (i + 1) % movieSlides.length)
  }

  const goLeasingPrev = () => {
    setLeasingIndex((i) => (i - 1 + leasingSlides.length) % leasingSlides.length)
  }

  const goLeasingNext = () => {
    setLeasingIndex((i) => (i + 1) % leasingSlides.length)
  }

  useEffect(() => {
    if (isMoviePaused) return
    const id = setInterval(() => {
      setMovieIndex((i) => (i + 1) % movieSlides.length)
    }, 1000)
    return () => clearInterval(id)
  }, [isMoviePaused, movieSlides.length])

  useEffect(() => {
    const currentWord = typeWords[wordIndex] ?? ''
    const isWordComplete = !isDeleting && charIndex === currentWord.length
    const isWordEmpty = isDeleting && charIndex === 0

    let delay = 90

    if (isWordComplete) delay = 900
    else if (isDeleting) delay = 45
    else if (charIndex === 0) delay = 250

    const t = setTimeout(() => {
      if (isWordComplete) {
        setIsDeleting(true)
        return
      }

      if (isWordEmpty) {
        setIsDeleting(false)
        setWordIndex((i) => (i + 1) % typeWords.length)
        return
      }

      setCharIndex((n) => n + (isDeleting ? -1 : 1))
    }, delay)

    return () => clearTimeout(t)
  }, [charIndex, isDeleting, typeWords, wordIndex])

  const typedText = (typeWords[wordIndex] ?? '').slice(0, charIndex)

  useEffect(() => {
    let cancelled = false

    const fetchWeather = async () => {
      try {
        const url = new URL('https://api.open-meteo.com/v1/forecast')
        url.searchParams.set('latitude', '34.4839')
        url.searchParams.set('longitude', '-114.3225')
        url.searchParams.set('current', 'temperature_2m,weather_code')
        url.searchParams.set('temperature_unit', 'fahrenheit')
        url.searchParams.set('timezone', 'auto')

        const res = await fetch(url.toString())
        if (!res.ok) throw new Error(`Weather request failed: ${res.status}`)

        const data = await res.json()
        const tempF = data?.current?.temperature_2m
        const code = data?.current?.weather_code

        if (cancelled) return

        setWeather({
          status: 'ready',
          tempF: typeof tempF === 'number' ? tempF : null,
          label: getWeatherLabelFromCode(code),
          code: typeof code === 'number' ? code : null,
        })
      } catch {
        if (cancelled) return
        setWeather({ status: 'error', tempF: null, label: '', code: null })
      }
    }

    fetchWeather()
    const id = setInterval(fetchWeather, 10 * 60 * 1000)

    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  useEffect(() => {
    const el = balloonSectionRef.current
    if (!el) return

    let raf = 0

    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 0

      if (rect.bottom <= 0 || rect.top >= vh) return

      const elementCenter = rect.top + rect.height / 2
      const viewportCenter = vh / 2
      const distanceFromCenter = elementCenter - viewportCenter

      const rawOffset = -distanceFromCenter * 0.32
      const clampedOffset = Math.max(-160, Math.min(160, rawOffset))

      setBalloonParallaxY(clampedOffset)
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [])

  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-b from-palette-white via-palette-pearlAqua/30 to-palette-camel/20 text-neutral-900">
      <header className="relative isolate">
        <div
          className="relative h-[75vh] min-h-[520px] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-palette-white/60 via-palette-white/10 to-transparent backdrop-blur-sm"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
          <div className="absolute inset-0 bg-palette-darkCyan/25" />

          <SiteHeader variant="overlay" />

          <div className="relative z-0 flex h-full items-center">
            <div className="mx-auto w-full max-w-6xl px-6">
              <div className="max-w-3xl">
                <h1 className="text-5xl font-extrabold tracking-tight text-white drop-shadow md:text-6xl">
                  This is where havasu comes for{' '}
                  <span className="text-[rgb(77_137_142_/_0.9)]">
                    {typedText}
                    <span className="inline-block w-[0.6ch] -translate-y-[0.06em] animate-pulse text-[rgb(133_195_200_/_0.95)]">|</span>
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* <section className="bg-palette-white">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="flex items-end justify-between gap-6">
              <div>
                <div className="text-xs font-semibold tracking-[0.25em] text-palette-darkCyan">WHAT'S HAPPENING</div>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">Events &amp; Specials</h2>
              </div>

              <a
                href="#"
                className="hidden rounded-md bg-palette-darkCyan px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-palette-bronze md:inline-flex"
              >
                View all
              </a>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <article className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold tracking-[0.25em] text-palette-camel">FRI • 7:00 PM</div>
                <h3 className="mt-3 text-lg font-bold text-neutral-900">Live Music on the Walkway</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-700">Grab dinner, stroll the shops, and enjoy local bands by the water.</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-palette-darkCyan">
                  Details
                  <span className="text-palette-bronze" aria-hidden="true">→</span>
                </div>
              </article>

              <article className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold tracking-[0.25em] text-palette-camel">SAT • ALL DAY</div>
                <h3 className="mt-3 text-lg font-bold text-neutral-900">Family Fun Day</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-700">Games, giveaways, and kid-friendly activities throughout the plaza.</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-palette-darkCyan">
                  Details
                  <span className="text-palette-bronze" aria-hidden="true">→</span>
                </div>
              </article>

              <article className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold tracking-[0.25em] text-palette-camel">SUN • 4:00 PM</div>
                <h3 className="mt-3 text-lg font-bold text-neutral-900">Dining &amp; Dessert Specials</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-700">Limited-time offers from your favorite spots—come hungry.</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-palette-darkCyan">
                  Details
                  <span className="text-palette-bronze" aria-hidden="true">→</span>
                </div>
              </article>
            </div>

            <div className="mt-8 md:hidden">
              <a
                href="#"
                className="inline-flex w-full items-center justify-center rounded-md bg-palette-darkCyan px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-palette-bronze"
              >
                View all
              </a>
            </div>
          </div>
        </section> */}

        <section className="bg-palette-white">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Link to="/directory" className="group relative isolate block overflow-hidden rounded-3xl">
                  <img
                    src={stateParkImg}
                    alt="Directory"
                    className="h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </Link>
              </div>

              <div className="lg:col-span-8">
                <div className="grid gap-6 md:grid-cols-3">
                  <Link to="/directory" className="group relative isolate block overflow-hidden rounded-3xl">
                    <img
                      src={shopsImg}
                      alt="Shops"
                      className="h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />

                    <div
                      className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[#EE9C2F]/90 transition-transform duration-500 ease-out group-hover:scale-x-100"
                      aria-hidden="true"
                    />

                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex min-h-[104px] items-center justify-between gap-4 rounded-b-3xl bg-gradient-to-t from-black/25 via-black/10 to-transparent px-4 py-4 backdrop-blur-sm transition-opacity duration-200 ease-out before:absolute before:inset-x-0 before:-top-6 before:h-6 before:bg-gradient-to-t before:from-black/20 before:to-transparent before:backdrop-blur-sm before:content-[''] group-hover:opacity-0"
                    >
                      <div className="max-w-[85%] text-4xl font-extrabold leading-none tracking-tight text-white drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]">
                        SHOPS
                      </div>
                      <span className="text-5xl font-black leading-none text-white drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]" aria-hidden="true">
                        →
                      </span>
                    </div>

                    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-center">
                      <div className="text-6xl font-extrabold leading-none tracking-tight text-white opacity-0 scale-95 transition-[opacity,transform] duration-150 ease-out delay-0 group-hover:duration-300 group-hover:delay-150 group-hover:opacity-100 group-hover:scale-100">
                        SHOPS
                      </div>
                    </div>
                  </Link>

                  <Link to="/directory?category=Dining" className="group relative isolate block overflow-hidden rounded-3xl">
                    <img
                      src={foodAndDrinksImg}
                      alt="Food & Drinks"
                      className="h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />

                    <div
                      className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[#80AEB3]/90 transition-transform duration-500 ease-out group-hover:scale-x-100"
                      aria-hidden="true"
                    />

                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-4 rounded-b-3xl bg-gradient-to-t from-black/25 via-black/10 to-transparent px-4 py-4 backdrop-blur-sm transition-opacity duration-200 ease-out before:absolute before:inset-x-0 before:-top-6 before:h-6 before:bg-gradient-to-t before:from-black/20 before:to-transparent before:backdrop-blur-sm before:content-[''] group-hover:opacity-0"
                    >
                      <div className="max-w-[85%] text-4xl font-extrabold leading-none tracking-tight text-white drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]">
                        FOOD & DRINKS
                      </div>
                      <span className="text-5xl font-black leading-none text-white drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]" aria-hidden="true">
                        →
                      </span>
                    </div>

                    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-center">
                      <div className="text-6xl font-extrabold leading-none tracking-tight text-white opacity-0 scale-95 transition-[opacity,transform] duration-150 ease-out delay-0 group-hover:duration-300 group-hover:delay-150 group-hover:opacity-100 group-hover:scale-100">
                        FOOD & DRINKS
                      </div>
                    </div>
                  </Link>

                  <Link to="/events" className="group relative isolate block overflow-hidden rounded-3xl">
                    <img
                      src={eventsAndOffersImg}
                      alt="Events"
                      className="h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />

                    <div
                      className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[#7CA280]/90 transition-transform duration-500 ease-out group-hover:scale-x-100"
                      aria-hidden="true"
                    />

                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex min-h-[104px] items-center justify-between gap-4 rounded-b-3xl bg-gradient-to-t from-black/25 via-black/10 to-transparent px-4 py-4 backdrop-blur-sm transition-opacity duration-200 ease-out before:absolute before:inset-x-0 before:-top-6 before:h-6 before:bg-gradient-to-t before:from-black/20 before:to-transparent before:backdrop-blur-sm before:content-[''] group-hover:opacity-0"
                    >
                      <div className="max-w-[85%] text-4xl font-extrabold leading-none tracking-tight text-white drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]">
                        EVENTS
                      </div>
                      <span className="text-5xl font-black leading-none text-white drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]" aria-hidden="true">
                        →
                      </span>
                    </div>

                    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-center">
                      <div className="text-6xl font-extrabold leading-none tracking-tight text-white opacity-0 scale-95 transition-[opacity,transform] duration-150 ease-out delay-0 group-hover:duration-300 group-hover:delay-150 group-hover:opacity-100 group-hover:scale-100">
                        EVENTS
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto h-px max-w-6xl bg-neutral-200/50" />

        <section className="bg-palette-white">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="text-center">
              <div className="text-xs font-semibold tracking-[0.25em] text-palette-bronze">STAR MOVIES</div>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">Curious what’s playing?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-700">
                Check showtimes, discover new releases, and plan your next movie night at Star Movies.
              </p>

              <div className="mt-8">
                <a
                  href="https://starcinemashavasu.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-6 py-2 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-neutral-50"
                >
                  View showtimes
                  <span className="ml-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-palette-bronze text-white" aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="mt-12">
              <div className="mx-auto max-w-5xl">
              

                <div className="relative mt-10" onMouseEnter={() => setIsMoviePaused(true)} onMouseLeave={() => setIsMoviePaused(false)}>
                  <button
                    type="button"
                    onClick={goMovieNext}
                    aria-label="Next"
                    className="absolute right-0 top-1/2 z-10 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 text-neutral-800 shadow-sm backdrop-blur hover:bg-white"
                  >
                    <span aria-hidden="true">›</span>
                  </button>

                  <div
                    className="relative mx-auto h-[380px] w-full max-w-5xl"
                    style={{ perspective: '1200px' }}
                  >
                    {movieSlides.map((slide, i) => {
                      const len = movieSlides.length
                      const dist = ((i - movieIndex) % len + len) % len

                      let rel = 999
                      if (dist <= 2) rel = dist
                      else if (dist >= len - 2) rel = dist - len
                      const absRel = Math.abs(rel)

                      const isActive = rel === 0

                      const translateX = rel * 180
                      const scale = isActive ? 1 : absRel === 1 ? 0.88 : absRel === 2 ? 0.78 : 0.65
                      const zIndex = isActive ? 40 : absRel === 1 ? 30 : absRel === 2 ? 20 : 0
                      const rotateY = isActive ? 0 : rel < 0 ? 18 : -18

                      const sizeClass = isActive
                        ? 'h-[360px] w-[300px] shadow-2xl'
                        : absRel === 1
                          ? 'h-[320px] w-[260px] shadow-xl'
                          : absRel === 2
                            ? 'h-[300px] w-[240px] shadow-lg'
                            : 'h-[280px] w-[220px]'

                      const isVisible = absRel <= 2
                      const transitionDuration = isVisible ? '900ms' : '0ms'

                      return (
                        <button
                          key={slide.title}
                          type="button"
                          onClick={goMovieNext}
                          className={`absolute left-1/2 top-1/2 overflow-hidden rounded-[28px] bg-white ${sizeClass}`}
                          style={{
                            transform: `translate3d(calc(-50% + ${translateX}px), -50%, 0) scale(${scale}) rotateY(${rotateY}deg)`,
                            zIndex,
                            pointerEvents: isVisible ? 'auto' : 'none',
                            opacity: isVisible ? 1 : 0,
                            transitionProperty: 'transform, opacity',
                            transitionDuration,
                            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                            willChange: 'transform',
                          }}
                          aria-label={`Go to slide ${i + 1}`}
                        >
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-2">
                    {movieSlides.map((_, i) => (
                      <div
                        key={i}
                        aria-hidden="true"
                        className={`h-1.5 rounded-full transition-all ${
                          i === movieIndex ? 'w-10 bg-neutral-700' : 'w-4 bg-neutral-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto h-px max-w-6xl bg-neutral-200/50" />

        <section className="bg-palette-white">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
              <div className="lg:col-span-5">
                <div className="text-xs font-semibold tracking-[0.25em] text-palette-bronze">DISCOUNTS & OFFERS</div>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">Save more on your next visit</h2>
                <p className="mt-4 text-sm leading-7 text-neutral-700">
                  Explore limited-time deals, seasonal specials, and exclusive discounts from your favorite spots.
                </p>

                <div className="mt-8">
                  <a
                    href="https://www.facebook.com/theshopsatlakehavasu/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-md bg-[rgb(128_174_179)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[rgb(238_156_47)]"
                  >
                    View Discounts & Offers
                  </a>
                </div>
              </div>

              <div className="lg:col-span-1 lg:self-stretch">
                <div className="my-10 h-px w-full bg-neutral-300 lg:hidden" aria-hidden="true" />
                <div className="hidden h-full w-px bg-neutral-200 lg:mx-auto lg:block" aria-hidden="true" />
              </div>

              <div className="lg:col-span-6">
                <div className="text-xs font-semibold tracking-[0.25em] text-palette-bronze">SOCIAL MEDIA GALLERY</div>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <h3 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">What’s happening now</h3>
                  <Link
                    to="/events"
                    aria-label="View events"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-lg font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50"
                  >
                    →
                  </Link>
                </div>
                <p className="mt-4 text-sm leading-7 text-neutral-700">A snapshot of moments, events, and favorites around the shops.</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[shopsImg, foodAndDrinksImg, eventsAndOffersImg, stateParkImg, londonBridgeImg, hotAirBalloon].map((img, idx) => (
                    <div key={idx} className="group relative isolate overflow-hidden rounded-2xl">
                      <img
                        src={img}
                        alt="Social media"
                        className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" aria-hidden="true" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto h-px max-w-6xl bg-neutral-200/50" />

        <section className="bg-palette-white">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <div className="group relative isolate overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
                  <img
                    src={lakeHavasuMedicalCenterImg}
                    alt="Lake Havasu Medical Center"
                    className="h-[340px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="text-xs font-semibold tracking-[0.25em] text-white/90">LAKE HAVASU MEDICAL CENTER</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
                  <div className="text-xs font-semibold tracking-[0.25em] text-palette-bronze">CONVERGENCE HEALTH</div>
                  <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900">
                    Now Offering Outpatient Surgical Services – Explore Our Surgery Center
                  </h3>

                  <div className="mt-8">
                    <a
                      href="https://convergencehealth.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-md bg-[rgb(128_174_179)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[rgb(238_156_47)]"
                    >
                      Visit Convergence Health
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto h-px max-w-6xl bg-neutral-200/50" />

        {/* <section className="bg-gradient-to-br from-palette-white via-palette-pearlAqua/45 to-palette-camel/35">
          <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-3">
              {featureCards.map((card) => (
                <a
                  key={card.title}
                  href="#"
                  className="group relative isolate w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-md"
                >
                  <div
                    className="h-[320px] w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03] sm:h-[360px] lg:h-[420px]"
                    style={{ backgroundImage: `url(${card.image})` }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-2xl font-extrabold tracking-tight text-white">{card.title}</h3>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-palette-bronze px-5 py-2.5 text-sm font-semibold text-white transition-colors group-hover:bg-palette-darkCyan">
                      {card.cta}
                      <span className="text-white" aria-hidden="true">→</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section> */}

        {/*
        <section className="bg-palette-white">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-4">
                <div className="text-xs font-semibold tracking-[0.25em] text-palette-darkCyan">GET TO KNOW US</div>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">Get to know us a little more</h2>
                <div className="mt-4 h-1 w-16 rounded-full bg-palette-bronze" aria-hidden="true" />
              </div>

              <div className="lg:col-span-8">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                  <p className="text-sm leading-7 text-neutral-800">
                    The Shops at Lake Havasu is an open-air shopping destination at the heart of Lake Havasu City. Since 2008, we've brought together top national retailers, local favorites, and community events—all in one spacious, walkable setting.
                  </p>
                  <p className="mt-5 text-sm leading-7 text-neutral-800">
                    With over 720,000 square feet of retail, dining, and entertainment, our center is designed for both locals and visitors to enjoy. From weekend events to everyday essentials, there's always something new to discover.
                  </p>
                  <p className="mt-5 text-sm leading-7 text-neutral-800">
                    Come shop, stroll, and experience what makes The Shops at Lake Havasu more than just a mall.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        */}

        {/* <section className="relative isolate">
          <div
            className="relative h-[340px] w-full bg-palette-white sm:h-[420px] lg:h-[520px]"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="pointer-events-none w-full">
                <div className="relative left-1/2 w-[140%] -translate-x-1/2 -rotate-6">
                  <div className="logo-marquee w-full opacity-55">
                    <div className="logo-marquee-track gap-5 px-4 sm:gap-7 sm:px-6">
                      {marqueeLogos
                        .concat(marqueeLogos)
                        .map((logo, i) => (
                          <div
                            key={`${logo.alt}-${i}`}
                            className="flex h-14 w-[200px] items-center justify-center rounded-full border border-palette-darkCyan/30 bg-white/80 px-6 backdrop-blur"
                          >
                            <div className="h-8 w-[140px]">
                            <img
                              src={logo.src}
                              alt={logo.alt}
                              className="h-full w-full object-contain opacity-90"
                              loading="lazy"
                            />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center">
              <div className="w-full px-3 sm:px-6 lg:px-10">
                <div className="mx-auto max-w-7xl">
                  <h2 className="grid grid-cols-[1fr_auto_1fr] items-end gap-x-4 font-display uppercase text-palette-darkCyan sm:gap-x-6">
                    <span className="justify-self-end text-center leading-[0.78] tracking-[0.06em] origin-bottom scale-y-[1.25] text-[14vw] sm:text-[110px] lg:text-[150px]">Discounts</span>
                    <span className="px-3 text-center leading-[0.78] tracking-[0.06em] origin-bottom scale-y-[1.25] text-[14vw] sm:text-[110px] lg:text-[150px]">And</span>
                    <span className="justify-self-start text-center leading-[0.78] tracking-[0.06em] origin-bottom scale-y-[1.25] text-[14vw] sm:text-[110px] lg:text-[150px]">Offers</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* <section className="bg-white" ref={balloonSectionRef}>
          <div className="relative w-full overflow-hidden">
            <div className="absolute inset-0 bg-black">
              <img
                src={qwe}
                alt="Hot air balloon"
                className="h-full w-full object-cover will-change-transform"
                style={{ transform: `translate3d(0, ${balloonParallaxY}px, 0) scale(1.5)`, transformOrigin: 'center' }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-black/0" />
            </div>

            <div className="relative mx-auto flex h-[360px] max-w-6xl items-center px-6 sm:h-[440px] lg:h-[520px]">
              <div className="max-w-md rounded-2xl border border-white/25 bg-white/15 p-6 text-white shadow-lg backdrop-blur sm:p-8">
                <p className="text-lg font-semibold leading-snug sm:text-xl">
                  Explore all shops, from national favorites to local gems.
                </p>
                <div className="mt-5">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-full bg-palette-bronze px-5 py-2 text-sm font-semibold tracking-wide text-white hover:brightness-95"
                  >
                    View Directory
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-4">
                <div className="text-xs font-semibold tracking-[0.25em] text-palette-darkCyan">MAP</div>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">Find us</h2>
                <div className="mt-4 h-1 w-16 rounded-full bg-palette-bronze" aria-hidden="true" />
                <p className="mt-4 text-sm leading-7 text-neutral-800">
                  Get directions to The Shops at Lake Havasu.
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
                  <div className="relative w-full h-[240px] sm:h-[280px] lg:h-[320px]">
                    <iframe
                      title="The Shops at Lake Havasu Map"
                      className="absolute inset-0 h-full w-full"
                      src="https://www.google.com/maps?q=The+Shops+at+Lake+Havasu&output=embed"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto h-px max-w-6xl bg-neutral-200/50" />

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <div className="text-xs font-semibold tracking-[0.25em] text-palette-darkCyan">EVENT SPACE</div>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">The Shops Event Space</h2>
                <div className="mt-4 h-1 w-16 rounded-full bg-palette-bronze" aria-hidden="true" />

                <p className="mt-4 text-sm leading-7 text-neutral-800">
                  Whether you’re a local organization, small business, or planning a community event, our space is designed
                  to bring people together.
                </p>

                <p className="mt-4 text-sm leading-7 text-neutral-800">
                  A flexible, event-ready space right at the heart of the mall—perfect for markets, workshops,
                  celebrations, and community-driven experiences.
                </p>

                <div className="mt-6 text-sm font-semibold text-neutral-900">Want to host an event?</div>
                <div className="mt-2 text-sm text-neutral-800">
                  Contact Us:{' '}
                  <a className="font-semibold text-[rgb(128_174_179)] hover:underline" href="mailto:admin@theshopslhc.com">
                    admin@theshopslhc.com
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="relative w-full h-[240px] sm:h-[280px] lg:h-[320px]">
                    <video className="absolute inset-0 h-full w-full object-cover" controls preload="metadata">
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto h-px max-w-6xl bg-neutral-200/50" />

        <section className="bg-palette-white">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-4">
                <div className="text-xs font-semibold tracking-[0.25em] text-palette-darkCyan">FEEDBACK</div>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">Help us improve your experience</h2>
                <div className="mt-4 h-1 w-16 rounded-full bg-palette-bronze" aria-hidden="true" />
              </div>

              <div className="lg:col-span-8">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                  <p className="text-sm text-neutral-700">
                    Help us improve your experience at The Shops at Lake Havasu by sharing your feedback.
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-semibold tracking-[0.15em] text-neutral-700" htmlFor="feedback-name">
                        NAME
                      </label>
                      <input
                        id="feedback-name"
                        value={feedbackName}
                        onChange={(e) => setFeedbackName(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm outline-none focus:border-palette-darkCyan"
                        placeholder="Your name"
                        type="text"
                        autoComplete="name"
                      />
                    </div>

                    <div className="sm:col-span-1">
                      <label className="block text-xs font-semibold tracking-[0.15em] text-neutral-700" htmlFor="feedback-email">
                        EMAIL
                      </label>
                      <input
                        id="feedback-email"
                        value={feedbackEmail}
                        onChange={(e) => setFeedbackEmail(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm outline-none focus:border-palette-darkCyan"
                        placeholder="you@example.com"
                        type="email"
                        autoComplete="email"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold tracking-[0.15em] text-neutral-700" htmlFor="feedback-message">
                        MESSAGE
                      </label>
                      <textarea
                        id="feedback-message"
                        value={feedbackMessage}
                        onChange={(e) => setFeedbackMessage(e.target.value)}
                        className="mt-2 min-h-[120px] w-full resize-y rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 shadow-sm outline-none focus:border-palette-darkCyan"
                        placeholder="Tell us what we can do better..."
                      />
                    </div>
                  </div>

                  {feedbackError ? (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700">{feedbackError}</div>
                  ) : null}
                  {feedbackSuccess ? (
                    <div className="mt-4 flex items-center justify-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-semibold text-green-800">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 flex-none" aria-hidden="true">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <div>{feedbackSuccess}</div>
                    </div>
                  ) : null}

                  <div className="mt-6 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={sendFeedback}
                      disabled={feedbackSubmitting}
                      className="inline-flex items-center justify-center rounded-md bg-[rgb(128_174_179)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[rgb(238_156_47)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {feedbackSubmitting ? 'Sending…' : 'Send Feedback'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto h-px max-w-6xl bg-neutral-200/50" />

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
                  <div className="relative h-[260px] w-full sm:h-[320px]">
                    <img
                      src={leasingSlides[leasingIndex]}
                      alt="Leasing"
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" aria-hidden="true" />

                    <button
                      type="button"
                      onClick={goLeasingPrev}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-neutral-900 shadow-sm backdrop-blur hover:bg-white"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={goLeasingNext}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-neutral-900 shadow-sm backdrop-blur hover:bg-white"
                    >
                      ›
                    </button>

                    <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
                      {leasingSlides.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          aria-label={`Go to image ${idx + 1}`}
                          onClick={() => setLeasingIndex(idx)}
                          className={`h-2 rounded-full transition-all ${idx === leasingIndex ? 'w-8 bg-white' : 'w-3 bg-white/60'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="text-xs font-semibold tracking-[0.25em] text-palette-darkCyan">LEASING</div>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">Now Leasing at The Shops at Lake Havasu</h2>
                <div className="mt-4 h-1 w-16 rounded-full bg-palette-bronze" aria-hidden="true" />

                <div className="mt-4 text-base font-extrabold tracking-tight text-neutral-900">Bring Your Brand to the Desert’s Retail Destination</div>
                <p className="mt-4 text-sm leading-7 text-neutral-800">
                  Looking to open a new storefront? We offer flexible leasing opportunities in a high-traffic, open-air
                  shopping center that features national retailers, restaurants, and entertainment—all surrounded by scenic
                  Lake Havasu views.
                </p>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => setIsLeasingModalOpen(true)}
                    className="inline-flex items-center justify-center rounded-md bg-[rgb(128_174_179)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[rgb(238_156_47)]"
                  >
                    Get in Touch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {isLeasingModalOpen ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-6 py-10"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsLeasingModalOpen(false)}
              aria-label="Close"
            />

            <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="flex items-start justify-between gap-4 border-b border-neutral-200 px-6 py-5">
                <div>
                  <div className="text-xs font-semibold tracking-[0.25em] text-palette-darkCyan">LEASING</div>
                  <div className="mt-2 text-2xl font-extrabold tracking-tight text-neutral-900">Why Lease With Us</div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLeasingModalOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-900 shadow-sm hover:bg-neutral-50"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="px-6 py-6">
                <div className="space-y-2 text-sm leading-7 text-neutral-800">
                  <div>Prime location with over 720,000 sq ft of retail space</div>
                  <div>Anchored by major brands like Dillard’s, Walmart, and PetSmart</div>
                  <div>Host to regular foot-traffic-driving events</div>
                  <div>Opportunities for both short-term pop-ups and long-term tenants</div>
                  <div>Supportive marketing and mall operations team</div>
                </div>

                <div className="mt-8">
                  <div className="text-base font-extrabold tracking-tight text-neutral-900">📄 Get in Touch</div>
                  <p className="mt-2 text-sm leading-7 text-neutral-800">
                    Interested in leasing a space? Let’s talk about what’s available and how we can support your goals.
                  </p>
                  <div className="mt-3 text-sm text-neutral-800">
                    <a className="font-semibold text-[rgb(128_174_179)] hover:underline" href="mailto:admin@theshopslhc.com">
                      admin@theshopslhc.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <SiteFooter />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppContent />} />
      <Route path="/directory" element={<Directory />} />
      <Route path="/events" element={<Events />} />
      <Route path="/maps" element={<Maps />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  )
}
