import {
  generateFAQSchema,
  generateSoftwareApplicationSchema,
} from '@/shared/lib/seo'

export function LandingStructuredData() {
  const structuredData = [
    generateSoftwareApplicationSchema(),
    generateFAQSchema(),
  ]

  return (
    <>
      {structuredData.map((item, index) => (
        <script
          key={index}
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
        />
      ))}
    </>
  )
}
