import { writeFileSync } from 'fs'
import { pwaConfig } from './config'

export function generateManifest(outputPath: string) {
  if (typeof window !== 'undefined') {
    throw new Error(
      'generateManifest может использоваться только на сервере (Node.js)',
    )
  }

  const manifest = JSON.stringify(pwaConfig.manifest, null, 2)
  writeFileSync(outputPath, manifest, 'utf-8')
  console.log(`✅ Manifest.json сгенерирован: ${outputPath}`)
}
