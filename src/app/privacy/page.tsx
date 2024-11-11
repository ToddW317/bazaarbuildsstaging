import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | BazaarBuilds',
  description: 'BazaarBuilds privacy policy and data handling practices.'
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
            <p className="text-gray-300">
              This Privacy Policy explains how BazaarBuilds.com ("we", "us", or "our") collects, uses, 
              and protects your personal information when you use our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
            <p className="text-gray-300 mb-4">We collect information that you provide directly to us:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Account information (email address, username)</li>
              <li>Profile information (display name, avatar)</li>
              <li>Content you create (builds, comments, ratings)</li>
              <li>Communications with us</li>
            </ul>
            
            <p className="text-gray-300 mt-4 mb-4">
              We automatically collect certain information when you use our website:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Log data (IP address, browser type, pages visited)</li>
              <li>Device information</li>
              <li>Usage information</li>
              <li>Cookies and similar technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>To provide and maintain our services</li>
              <li>To process your requests and transactions</li>
              <li>To improve our website and user experience</li>
              <li>To communicate with you</li>
              <li>To prevent fraud and abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Cookies and Advertising</h2>
            <p className="text-gray-300 mb-4">
              We use cookies and similar tracking technologies to track activity on our website and 
              hold certain information. We also use third-party advertising services (including Google AdSense) 
              that may use cookies to serve ads based on your prior visits to our website or other websites.
            </p>
            <p className="text-gray-300">
              You can choose to have your computer warn you each time a cookie is being sent, or you can 
              choose to turn off all cookies through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Data Sharing and Disclosure</h2>
            <p className="text-gray-300">We may share your information with:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Service providers and business partners</li>
              <li>Law enforcement when required by law</li>
              <li>Other users (for public profile information and content)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
            <p className="text-gray-300">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@bazaarbuilds.com" className="text-blue-400 hover:text-blue-300">
                privacy@bazaarbuilds.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
            <p className="text-gray-300">
              We may update this Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "last updated" date.
            </p>
            <p className="text-gray-300 mt-4">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </div>
  )
} 