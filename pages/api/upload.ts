import type { NextApiRequest, NextApiResponse } from 'next';
import { uploadToCloudinary } from '@/lib/cloudinary';

export const config = { api: { bodyParser: { sizeLimit: '10mb' } } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { file, folder = 'aria-voss', publicId } = req.body as {
    file?: string;
    folder?: string;
    publicId?: string;
  };

  if (!file) {
    return res.status(400).json({ error: 'file (base64 string) is required' });
  }

  try {
    const buffer = Buffer.from(file.replace(/^data:.+;base64,/, ''), 'base64');
    const result = await uploadToCloudinary(buffer, folder, publicId);
    return res.status(200).json(result);
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    return res.status(500).json({ error: 'Upload failed' });
  }
}
