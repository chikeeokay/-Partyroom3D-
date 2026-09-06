import fs from 'fs';
import path from 'path';
import { VenuePhoto } from '../src/types';

const ROOT_DIR = process.cwd();
const DATA_TS_PATH = path.join(ROOT_DIR, 'src', 'data.ts');
const UPLOADS_DIR = path.join(ROOT_DIR, 'public', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

/**
 * Saves a base64 encoded image to the public/uploads folder and returns its public URL.
 */
export function saveBase64Image(dataUrl: string, prefix = 'photo'): string {
  if (!dataUrl.startsWith('data:image/')) {
    return dataUrl; // Already a URL or path
  }

  const matches = dataUrl.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
  if (!matches || matches.length < 3) {
    return dataUrl;
  }

  let ext = matches[1].toLowerCase();
  if (ext === 'jpeg') ext = 'jpg';
  if (ext === 'svg+xml') ext = 'svg';

  const base64Data = matches[2];
  const buffer = Buffer.from(base64Data, 'base64');

  const fileName = `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}.${ext}`;
  const filePath = path.join(UPLOADS_DIR, fileName);

  fs.writeFileSync(filePath, buffer);

  // Also sync to dist/uploads if dist exists for static production
  const distUploadsDir = path.join(ROOT_DIR, 'dist', 'uploads');
  try {
    if (!fs.existsSync(distUploadsDir)) {
      fs.mkdirSync(distUploadsDir, { recursive: true });
    }
    fs.writeFileSync(path.join(distUploadsDir, fileName), buffer);
  } catch (e) {
    // ignore if dist not built yet
  }

  return `/uploads/${fileName}`;
}

/**
 * Writes the given photos directly into src/data.ts, saving any embedded base64 images to public/uploads/.
 */
export function writeVenuePhotosToDataTs(photos: VenuePhoto[]): { 
  success: boolean; 
  updatedPhotos: VenuePhoto[]; 
  count: number; 
  message: string 
} {
  try {
    if (!fs.existsSync(DATA_TS_PATH)) {
      throw new Error(`找不到檔案: ${DATA_TS_PATH}`);
    }

    // 1. Process all photos: convert any data URL to static file in public/uploads/
    const processedPhotos: VenuePhoto[] = photos.map((p, index) => {
      let finalImageUrl = p.imageUrl;
      if (p.imageUrl && p.imageUrl.startsWith('data:image/')) {
        finalImageUrl = saveBase64Image(p.imageUrl, `venue-${p.category || 'photo'}-${index + 1}`);
      }
      return {
        ...p,
        imageUrl: finalImageUrl
      };
    });

    // 2. Read src/data.ts
    const currentContent = fs.readFileSync(DATA_TS_PATH, 'utf-8');

    // 3. Replace the VENUE_PHOTOS section
    const targetRegex = /export const VENUE_PHOTOS: VenuePhoto\[\] = \[[\s\S]*?\];/;
    if (!targetRegex.test(currentContent)) {
      throw new Error('無法在 src/data.ts 中定位 export const VENUE_PHOTOS 區塊');
    }

    const replacement = `export const VENUE_PHOTOS: VenuePhoto[] = ${JSON.stringify(processedPhotos, null, 2)};`;
    const newContent = currentContent.replace(targetRegex, replacement);

    // 4. Write back to src/data.ts
    fs.writeFileSync(DATA_TS_PATH, newContent, 'utf-8');

    return {
      success: true,
      updatedPhotos: processedPhotos,
      count: processedPhotos.length,
      message: `已成功將 ${processedPhotos.length} 張相片 100% 永久寫入專案 src/data.ts 原始碼中！`
    };
  } catch (error: any) {
    console.error('寫入 src/data.ts 失敗:', error);
    throw error;
  }
}

/**
 * Reads the current VENUE_PHOTOS directly from src/data.ts.
 */
export function getVenuePhotosFromDataTs(): VenuePhoto[] {
  try {
    if (!fs.existsSync(DATA_TS_PATH)) return [];
    const content = fs.readFileSync(DATA_TS_PATH, 'utf-8');
    const targetRegex = /export const VENUE_PHOTOS: VenuePhoto\[\] = (\[[\s\S]*?\]);/;
    const match = content.match(targetRegex);
    if (match && match[1]) {
      // Safely evaluate or parse JSON
      try {
        return JSON.parse(match[1]);
      } catch {
        // In case it has unquoted keys or comments
        const fn = new Function(`return ${match[1]}`);
        return fn();
      }
    }
    return [];
  } catch (err) {
    console.error('讀取 src/data.ts 失敗:', err);
    return [];
  }
}

/**
 * Reads raw src/data.ts content for code preview.
 */
export function readDataTsContent(): string {
  try {
    if (!fs.existsSync(DATA_TS_PATH)) return '';
    return fs.readFileSync(DATA_TS_PATH, 'utf-8');
  } catch {
    return '';
  }
}

