import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

/**
 * Build an optimized Cloudinary URL with transformations.
 */
export function buildCloudinaryUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: number | 'auto';
    format?: string;
    crop?: string;
    gravity?: string;
  } = {}
): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
  } = options;

  const transformations: string[] = [`f_${format}`, `q_${quality}`];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width || height) transformations.push(`c_${crop}`, `g_${gravity}`);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations.join(',')}/${publicId}`;
}

/**
 * Upload a file buffer to Cloudinary and return the result.
 */
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: string,
  publicId?: string
) {
  return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
    const uploadOptions: Record<string, unknown> = { folder, resource_type: 'auto' };
    if (publicId) uploadOptions.public_id = publicId;

    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error || !result) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      })
      .end(fileBuffer);
  });
}
