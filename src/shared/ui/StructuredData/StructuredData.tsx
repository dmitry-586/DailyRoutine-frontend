import type { ReactNode } from 'react'

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[] | unknown
}

export function StructuredData({ data }: StructuredDataProps): ReactNode {
  const jsonLd = Array.isArray(data) ? data : [data]

  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item as Record<string, unknown>),
          }}
        />
      ))}
    </>
  )
}
