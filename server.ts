import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { 
  writeVenuePhotosToDataTs, 
  saveBase64Image, 
  getVenuePhotosFromDataTs, 
  readDataTsContent 
} from "./server/photoStorage";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser with 50mb limit for image uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // API Routes go here FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Save photos directly into src/data.ts source code
  app.post("/api/save-photos", (req, res) => {
    try {
      const { photos } = req.body;
      if (!photos || !Array.isArray(photos)) {
        return res.status(400).json({ success: false, error: "缺少相片清單陣列" });
      }
      const result = writeVenuePhotosToDataTs(photos);
      return res.json(result);
    } catch (error: any) {
      console.error("API /api/save-photos 失敗:", error);
      return res.status(500).json({ success: false, error: error.message || "寫入失敗" });
    }
  });

  // Upload single image to public/uploads/
  app.post("/api/upload-image", (req, res) => {
    try {
      const { base64, prefix } = req.body;
      if (!base64) {
        return res.status(400).json({ success: false, error: "缺少圖片資料" });
      }
      const url = saveBase64Image(base64, prefix || "venue");
      return res.json({ success: true, url });
    } catch (error: any) {
      console.error("API /api/upload-image 失敗:", error);
      return res.status(500).json({ success: false, error: error.message || "上傳失敗" });
    }
  });

  // Get current photos from src/data.ts
  app.get("/api/photos", (req, res) => {
    try {
      const photos = getVenuePhotosFromDataTs();
      res.json(photos);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get raw src/data.ts source code
  app.get("/api/data-ts", (req, res) => {
    try {
      const content = readDataTsContent();
      res.type("text/plain").send(content);
    } catch (error: any) {
      res.status(500).send("無法讀取 src/data.ts");
    }
  });

  // Static serving for user uploaded images and public assets
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use("/uploads", express.static(uploadsDir));
  app.use(express.static(publicDir));

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
