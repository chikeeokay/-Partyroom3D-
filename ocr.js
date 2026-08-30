import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';

async function ocrSpace(filename) {
  const formData = new FormData();
  formData.append('apikey', 'helloworld');
  formData.append('language', 'cht');
  formData.append('file', fs.createReadStream('./public/' + filename));

  const response = await axios.post('https://api.ocr.space/parse/image', formData, {
    headers: formData.getHeaders()
  });
  console.log('---', filename, '---');
  if (response.data.ParsedResults) {
    console.log(response.data.ParsedResults[0].ParsedText);
  } else {
    console.log(response.data);
  }
}

async function main() {
  await ocrSpace('event-3.png.jpg');
  await ocrSpace('event-4.png.jpg');
}
main();
