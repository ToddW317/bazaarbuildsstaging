'use client'

interface SkillDisplayProps {
  skill: {
    Name: string
    Description: string
    Cooldown?: number
    Damage?: number
    Shield?: number
    Healing?: number
    Duration?: number
  }
}

export default function SkillDisplay({ skill }: SkillDisplayProps) {
  return (
    <div className="bg-gray-700/30 rounded-lg overflow-hidden">
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium text-white">{skill.Name}</span>
          {skill.Cooldown && (
            <span className="text-sm text-cyan-400">
              {skill.Cooldown}s CD
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-300 mt-2 mb-4">{skill.Description}</p>

        {/* Skill Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {skill.Damage && (
            <div className="bg-gray-800/50 rounded p-2">
              <span className="text-red-400 text-sm">Damage</span>
              <div className="text-white font-bold">{skill.Damage}</div>
            </div>
          )}
          {skill.Shield && (
            <div className="bg-gray-800/50 rounded p-2">
              <span className="text-yellow-400 text-sm">Shield</span>
              <div className="text-white font-bold">{skill.Shield}</div>
            </div>
          )}
          {skill.Healing && (
            <div className="bg-gray-800/50 rounded p-2">
              <span className="text-green-400 text-sm">Healing</span>
              <div className="text-white font-bold">{skill.Healing}</div>
            </div>
          )}
          {skill.Duration && (
            <div className="bg-gray-800/50 rounded p-2">
              <span className="text-blue-400 text-sm">Duration</span>
              <div className="text-white font-bold">{skill.Duration}s</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 