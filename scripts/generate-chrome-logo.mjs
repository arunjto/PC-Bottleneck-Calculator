import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

// Keep the original logo URL untouched; emit a 3x-density thumbnail for the
// 28px navbar and 36px footer without requiring a runtime image service.
await sharp(fileURLToPath(new URL('../public/logo.webp', import.meta.url)))
  .resize(108, 108, { fit: 'inside', withoutEnlargement: true })
  .webp({ quality: 85 })
  .toFile(fileURLToPath(new URL('../public/images/logo-chrome.webp', import.meta.url)));
