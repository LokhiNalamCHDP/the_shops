import SiteFooter from '../components/SiteFooter'
import SiteHeader from '../components/SiteHeader'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900">Privacy Policy</h1>
        <div className="mt-3 text-sm font-semibold text-neutral-600">Last Updated: Dec 2025</div>

        <p className="mt-8 text-sm leading-7 text-neutral-700">
          The Shops at Lake Havasu (“we,” “our,” or “us”) is committed to protecting your privacy. This Privacy Policy
          describes how we collect, use, and share personal information when you visit or interact with our website.
        </p>

        <div className="mt-10 space-y-10">
          <section>
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">1. Information We Collect</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">We may collect the following types of personal information:</p>
            <div className="mt-4 space-y-2 text-sm leading-7 text-neutral-700">
              <div>
                <span className="font-semibold text-neutral-900">Contact Information:</span> name, email address, phone number
                (when provided voluntarily)
              </div>
              <div>
                <span className="font-semibold text-neutral-900">Account Information:</span> for store owners who log in to post
                promotions
              </div>
              <div>
                <span className="font-semibold text-neutral-900">Usage Information:</span> IP address, browser type, and website
                activity (through cookies or analytics tools)
              </div>
              <div>
                <span className="font-semibold text-neutral-900">Social Media Content:</span> if you interact with us or embed
                Facebook content
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">2. How We Use Your Information</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">We use your information to:</p>
            <div className="mt-4 space-y-2 text-sm leading-7 text-neutral-700">
              <div>Enable store accounts to post and manage promotions</div>
              <div>Respond to inquiries or feedback submitted through the website</div>
              <div>Display relevant promotions and events</div>
              <div>Improve the site’s functionality and user experience</div>
              <div>Comply with legal obligations</div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">3. Sharing Your Information</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">We may share your information with:</p>
            <div className="mt-4 space-y-2 text-sm leading-7 text-neutral-700">
              <div>Service providers (e.g. website hosting, analytics tools)</div>
              <div>Store owners when you interact with their offers</div>
              <div>Law enforcement or legal authorities when required</div>
            </div>
            <p className="mt-4 text-sm font-semibold text-neutral-700">We do not sell your personal information.</p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">4. Cookies &amp; Tracking</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              We use cookies and analytics (such as Google Analytics and Facebook tools) to understand site traffic and improve
              your experience. You may control or disable cookies in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">5. Your Choices</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">You may:</p>
            <div className="mt-4 space-y-2 text-sm leading-7 text-neutral-700">
              <div>Unsubscribe from emails at any time</div>
              <div>Contact us to access or delete your information</div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">6. Children&apos;s Privacy</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              This site is not intended for users under the age of 16. We do not knowingly collect information from children.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">7. Updates</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              We may update this policy from time to time. The latest version will always be posted here.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">8. Contact Us</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              If you have questions or concerns about this policy, please contact us at:
            </p>
            <div className="mt-4 text-sm leading-7 text-neutral-700">
              <a className="font-semibold text-[rgb(128_174_179)] hover:underline" href="mailto:admin@theshopslhc.com">
                admin@theshopslhc.com
              </a>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
