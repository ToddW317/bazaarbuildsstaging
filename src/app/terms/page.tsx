import { Metadata } from 'next'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-300">
              By accessing or using BazaarBuilds.com, you agree to be bound by these Terms of Service 
              and all applicable laws and regulations. If you do not agree with any of these terms, you 
              are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
            <p className="text-gray-300 mb-4">
              Permission is granted to temporarily access the materials (information or software) on 
              BazaarBuilds.com for personal, non-commercial viewing only.
            </p>
            <p className="text-gray-300">This license shall automatically terminate if you violate any of these restrictions:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or proprietary notations</li>
              <li>Transfer the materials to another person</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Content</h2>
            <p className="text-gray-300 mb-4">
              Users may post content including builds, comments, and other materials. You retain ownership 
              of your content, but grant us a worldwide, non-exclusive license to use, copy, modify, and 
              display that content.
            </p>
            <p className="text-gray-300">You agree not to post content that:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Is illegal or promotes illegal activities</li>
              <li>Is abusive, threatening, or harassing</li>
              <li>Infringes on others' intellectual property rights</li>
              <li>Contains malicious code or links</li>
              <li>Violates others' privacy</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Disclaimer</h2>
            <p className="text-gray-300">
              The materials on BazaarBuilds.com are provided on an 'as is' basis. We make no warranties, 
              expressed or implied, and hereby disclaim and negate all other warranties including, without 
              limitation, implied warranties or conditions of merchantability, fitness for a particular 
              purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Limitations</h2>
            <p className="text-gray-300">
              In no event shall BazaarBuilds.com or its suppliers be liable for any damages (including, 
              without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Advertising</h2>
            <p className="text-gray-300">
              We use third-party advertising companies, including Google AdSense, to serve ads when you 
              visit our website. These companies may use information about your visits to this and other 
              websites to provide advertisements about goods and services of interest to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Revisions</h2>
            <p className="text-gray-300">
              We may update these Terms of Service from time to time. We will notify you of any changes by 
              posting the new Terms of Service on this page and updating the "last updated" date.
            </p>
            <p className="text-gray-300 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Contact</h2>
            <p className="text-gray-300">
              If you have any questions about these Terms of Service, please contact us at:
              <br />
              <a href="mailto:terms@bazaarbuilds.com" className="text-blue-400 hover:text-blue-300">
                terms@bazaarbuilds.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Terms of Service | BazaarBuilds',
  description: 'BazaarBuilds terms of service and usage guidelines.'
} 