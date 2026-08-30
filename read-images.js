import Tesseract from 'tesseract.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function readImage(filename) {
  try {
    const { data: { text } } = await Tesseract.recognize(
      path.join(__dirname, 'public', filename),
      'chi_tra',
      { logger: m => {} }
    );
    console.log(`\n--- ${filename} ---`);
    console.log(text.trim());
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
  }
}

async function main() {
  await readImage('event-1.png.jpg');
  await readImage('event-2.png.jpg');
  await readImage('event-3.png.jpg');
  await readImage('event-4.png.jpg');
}

main();
