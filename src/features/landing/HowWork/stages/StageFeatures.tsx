import { StageFeature } from '../types'

const ACCENT_CLASSNAME: Record<NonNullable<StageFeature['accent']>, string> = {
  emerald: 'text-emerald-400',
  cyan: 'text-cyan-300',
}

interface StageFeaturesProps {
  features: StageFeature[]
}

export default function StageFeatures({ features }: StageFeaturesProps) {
  return (
    <ul className='space-y-2.5 max-sm:space-y-1.5'>
      {features.map(({ id, icon: Icon, text, accent = 'emerald' }) => (
        <li key={id} className='flex items-start gap-3 max-sm:gap-2'>
          <Icon
            className={`mt-0.5 h-5 w-5 flex-shrink-0 ${ACCENT_CLASSNAME[accent]} max-sm:mt-0 max-sm:h-4 max-sm:w-4`}
            aria-hidden
          />
          <span className='text-base leading-relaxed text-gray-300 max-sm:text-sm max-sm:leading-snug'>
            {text}
          </span>
        </li>
      ))}
    </ul>
  )
}
