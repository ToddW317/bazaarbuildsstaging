'use client'

interface ProgressBarProps {
  current: number
  target: number
}

const ProgressBar = ({ current, target }: ProgressBarProps) => {
  const percentage = (current / target) * 100
  const clampedPercentage = Math.min(100, Math.max(0, percentage))

  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-blue-300">$0</span>
        <span className="text-green-300">${current} raised</span>
        <span className="text-blue-300">${target}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    </div>
  )
}

export default function BuildsDisabledBanner() {
  const currentAmount = 10

  return (
    <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 text-blue-300 px-4 py-3 rounded-lg mb-6 border border-blue-500/30">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm md:text-base font-medium">
          <span className="text-yellow-300 font-bold">Builds are temporarily disabled</span>{' '}
          until a subtle monetization strategy is implemented to offset server costs.{' '}
          <span className="text-green-300">You all are impressive!</span>
        </p>
        <ProgressBar 
          current={currentAmount}
          target={45}
        />
        <p className="text-xs text-gray-400 mt-2">
          Server costs are ~$45/day to operate. Help us bring this back up NOW until the NON-INTRUSIVE monetization strategy is implemented. Thank you!
        </p>
      </div>
    </div>
  )
} 