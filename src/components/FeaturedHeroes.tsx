'use client'

export default function FeaturedHeroes() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="aspect-square relative">
          <img
            src="/heroes/pygmalien.webp"
            alt="Pygmalien"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-bold text-white">Pygmalien</h3>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="aspect-square relative">
          <img
            src="/heroes/vanessa.webp"
            alt="Vanessa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-bold text-white">Vanessa</h3>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="aspect-square relative">
          <img
            src="/heroes/mason.webp"
            alt="Mason"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-bold text-white">Mason</h3>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="aspect-square relative">
          <img
            src="/heroes/common.webp"
            alt="Common"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-bold text-white">Common</h3>
          </div>
        </div>
      </div>
    </div>
  )
} 