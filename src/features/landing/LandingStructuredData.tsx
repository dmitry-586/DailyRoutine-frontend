import {
  generateFAQSchema,
  generateSoftwareApplicationSchema,
} from '@/shared/lib/seo'
import { StructuredData } from '@/shared/ui/StructuredData'

export default function LandingStructuredData() {
  const structuredData = [
    generateSoftwareApplicationSchema(),
    generateFAQSchema(),
  ]

  return <StructuredData data={structuredData} />
}
