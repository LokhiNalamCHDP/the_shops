import SiteFooter from '../components/SiteFooter'
import SiteHeader from '../components/SiteHeader'

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900">Terms of Use</h1>
        <div className="mt-3 text-sm font-semibold text-neutral-600">Effective Date: Dec 2025</div>

        <p className="mt-8 text-sm leading-7 text-neutral-700">
          Welcome to The Shops at Lake Havasu website (“Site”). By accessing or using this Site, you agree to these Terms of
          Use and our Privacy Policy. If you do not agree, please do not use the Site.
        </p>

        <div className="mt-10 space-y-10">
          <section>
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">1. Eligibility and Jurisdiction</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              This Site is intended for U.S. users over the age of 16. By using the Site, you confirm you are located in the
              U.S. and agree to comply with all applicable U.S. laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">2. Use of Content</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              All images, text, logos, and materials on this Site are the property of The Shops at Lake Havasu or our partners.
              You may browse and use content for personal, non-commercial purposes only. Any copying, redistribution, or
              commercial use is prohibited without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">3. User Submissions</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              If you submit feedback, event inquiries, or promotional content via the Site, you grant us permission to use,
              share, and publish that content for promotional or operational purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">4. Store Accounts</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              Authorized store users may access a login area to post promotions or events. You are responsible for keeping your
              account credentials secure and for any activity under your login.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">5. Prohibited Conduct</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">Users may not:</p>
            <div className="mt-4 space-y-2 text-sm leading-7 text-neutral-700">
              <div>Post or submit unlawful or offensive content</div>
              <div>Attempt to interfere with the Site’s functionality</div>
              <div>Use the Site to collect information without consent</div>
              <div>Violate the rights of others or applicable laws</div>
            </div>
            <p className="mt-4 text-sm leading-7 text-neutral-700">
              We reserve the right to remove content, disable accounts, or restrict access at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">6. Third-Party Links</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              This Site may include links to third-party sites such as Facebook. We are not responsible for their content,
              privacy practices, or terms of use.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">7. Disclaimer &amp; Limitation of Liability</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              This Site is provided “as is” and we make no warranties regarding its availability or accuracy. We are not liable
              for any damages resulting from your use of the Site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">8. Modifications</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              We may update these Terms of Use at any time. Continued use of the Site after changes are posted means you accept
              the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">9. Contact</h2>
            <p className="mt-3 text-sm leading-7 text-neutral-700">For questions about these terms, contact us at:</p>
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
