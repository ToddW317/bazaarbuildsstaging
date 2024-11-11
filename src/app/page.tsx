import Link from 'next/link'
import Image from 'next/image'
import { HEROES } from '@/config/heroes'
import GoogleAd from '@/components/GoogleAd'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section - increased height from h-[600px] to h-[700px] */}
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900 z-10" />
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.png"
            alt="Hero Background"
            fill
            className="object-cover object-top"
            style={{ objectPosition: '50% 10%' }}
            priority
          />
        </div>

        {/* Content - adjusted padding for better vertical centering */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center py-20">
          <h1 className="text-6xl font-bold mb-8">
            <span className="text-white">Bazaar</span>
            <span className="text-blue-400">Builds</span>
            <span className="text-gray-400 text-3xl ml-2">.com</span>
          </h1>
          <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
            Create, share, and discover the most powerful hero builds. Join the community and dominate the arena with optimized strategies.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/builds"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold 
                hover:bg-blue-700 transition-colors"
            >
              Explore Builds
            </Link>
            <Link 
              href="/builds/new"
              className="bg-gray-700 text-white px-8 py-3 rounded-lg text-lg font-semibold 
                hover:bg-gray-600 transition-colors"
            >
              Create Build
            </Link>
          </div>
        </div>
      </section>

      {/* Ad after hero */}
      <GoogleAd slot="YOUR_AD_SLOT_8" />

      {/* Heroes Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Featured Heroes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HEROES.map(hero => (
              <div 
                key={hero.id}
                className="bg-gray-900 rounded-lg p-6 text-center hover:bg-gray-800 
                  transition-colors border border-gray-700"
              >
                <div className="relative h-48 mb-4">
                  <Image
                    src={hero.imageUrl}
                    alt={hero.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{hero.name}</h3>
                <p className="text-gray-400">{hero.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad before features */}
      <GoogleAd slot="YOUR_AD_SLOT_9" />

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Share Your Greatest Moments</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
              <div className="text-5xl mb-4 text-blue-400">📸</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Share Screenshots</h3>
              <p className="text-gray-400">Showcase your epic victories and perfect builds with up to 5 high-quality screenshots</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
              <div className="text-5xl mb-4 text-blue-400">🎮</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Upload Clips</h3>
              <p className="text-gray-400">Demonstrate your skills with 30-second gameplay clips of your builds in action</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
              <div className="text-5xl mb-4 text-blue-400">🏆</div>
              <h3 className="text-xl font-semibold mb-2 text-white">Build Strategies</h3>
              <p className="text-gray-400">Share detailed strategies for Aggro, Shield, and Health builds with the community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom ad */}
      <GoogleAd slot="YOUR_AD_SLOT_10" />

      {/* CTA Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Share Your Build?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join our growing community of players and help shape the meta with your unique strategies.
          </p>
          <Link 
            href="/builds/new"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold 
              hover:bg-blue-700 transition-colors inline-block"
          >
            Submit Your Build
          </Link>
        </div>
      </section>
    </div>
  )
}
