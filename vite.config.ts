import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { writeVenuePhotosToDataTs, saveBase64Image, getVenuePhotosFromDataTs, readDataTsContent } from './server/photoStorage';

function photoStoragePlugin(): Plugin {
  return {
    name: 'photo-storage-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Handle /api/save-photos
        if (req.url === '/api/save-photos' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              if (!data.photos || !Array.isArray(data.photos)) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: '缺少相片清單陣列' }));
                return;
              }
              const result = writeVenuePhotosToDataTs(data.photos);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result));
            } catch (err: any) {
              console.error('API Error /api/save-photos:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message || '寫入失敗' }));
            }
          });
          return;
        }

        // Handle /api/upload-image
        if (req.url === '/api/upload-image' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              if (!data.base64) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: '缺少圖片資料' }));
                return;
              }
              const url = saveBase64Image(data.base64, data.prefix || 'venue');
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, url }));
            } catch (err: any) {
              console.error('API Error /api/upload-image:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message || '上傳失敗' }));
            }
          });
          return;
        }

        // Handle /api/photos (GET)
        if (req.url === '/api/photos' && req.method === 'GET') {
          try {
            const photos = getVenuePhotosFromDataTs();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(photos));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        // Handle /api/data-ts (GET)
        if (req.url === '/api/data-ts' && req.method === 'GET') {
          try {
            const content = readDataTsContent();
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end(content);
          } catch (err: any) {
            res.statusCode = 500;
            res.end('無法讀取');
          }
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), photoStoragePlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
