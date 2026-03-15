/**
 * Upload Instagram photos to Cloudinary
 * 1. Save photos from Instagram into the ./instagram_photos/ folder
 * 2. Run: node upload_instagram.mjs
 */
import { v2 as cloudinary } from 'cloudinary';
import { readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

cloudinary.config({
  cloud_name: 'dngcmz2ye',
  api_key:    '221617999783246',
  api_secret: 'uFcuQYncTq_WTLuzBisnUP6GYZU',
});

const INPUT_DIR    = join(__dirname, 'instagram_photos');
const CLOUDINARY_FOLDER = 'mavhungu/instagram';
const ALLOWED_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

if (!existsSync(INPUT_DIR)) {
  mkdirSync(INPUT_DIR);
  console.log(`Created folder: instagram_photos/`);
  console.log(`Save your Instagram photos there, then re-run this script.`);
  process.exit(0);
}

const files = readdirSync(INPUT_DIR).filter(f => ALLOWED_EXTS.includes(extname(f).toLowerCase()));

if (files.length === 0) {
  console.log('No image files found in instagram_photos/. Add photos and re-run.');
  process.exit(0);
}

console.log(`Found ${files.length} image(s). Uploading to Cloudinary folder: ${CLOUDINARY_FOLDER}\n`);

const results = [];

for (const file of files) {
  const filePath  = join(INPUT_DIR, file);
  const publicId  = `${CLOUDINARY_FOLDER}/${file.replace(/\.[^.]+$/, '')}`;
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id:     publicId,
      overwrite:     true,
      resource_type: 'image',
    });
    console.log(`✓ ${file}`);
    console.log(`  URL: ${result.secure_url}\n`);
    results.push({ file, url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}\n`);
  }
}

console.log('--- Done ---');
console.log(`Uploaded ${results.length} / ${files.length} photos.\n`);
console.log('Cloudinary URLs:');
results.forEach(r => console.log(`  ${r.url}`));
