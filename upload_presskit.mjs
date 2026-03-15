import { v2 as cloudinary } from 'cloudinary';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

cloudinary.config({
  cloud_name: 'dngcmz2ye',
  api_key: '221617999783246',
  api_secret: 'uFcuQYncTq_WTLuzBisnUP6GYZU',
});

const presskitDir = join(__dirname, 'mavhungu_presskit');
const files = readdirSync(presskitDir).filter(f => f.endsWith('.png'));

for (const file of files) {
  const filePath = join(presskitDir, file);
  const publicId = `mavhungu/${file.replace('.png', '')}`;
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
    });
    console.log(`✓ ${file} → ${result.secure_url}`);
  } catch (err) {
    console.error(`✗ ${file}:`, err.message);
  }
}
