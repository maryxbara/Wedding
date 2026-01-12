import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import heicConvert from "heic-convert";
import sharp from "sharp";

const ROOT = process.cwd();
const INPUT_DIR = path.join(ROOT, "photos");
const OUTPUT_DIR = path.join(ROOT, "public", "images");
const MANIFEST_PATH = path.join(OUTPUT_DIR, "manifest.json");

const isHeic = (file) => /\.heic$/i.test(file);
const isWebImage = (file) => /\.(jpe?g|png|webp|heic)$/i.test(file);

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function readInputFiles() {
  const entries = await fs.readdir(INPUT_DIR);
  return entries.filter(isWebImage).sort((a, b) => a.localeCompare(b));
}

async function ensureOutputDir() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
}

async function toBuffer(filePath, fileName) {
  const file = await fs.readFile(filePath);
  if (!isHeic(fileName)) return file;

  const outputBuffer = await heicConvert({
    buffer: file,
    format: "JPEG",
    quality: 0.92,
  });

  return Buffer.from(outputBuffer);
}

async function convertOne({ inputPath, outputPath, maxWidth }) {
  const pipeline = sharp(inputPath, { failOn: "none" })
    .rotate()
    .resize({
      width: maxWidth,
      withoutEnlargement: true,
    })
    .webp({ quality: 82 });

  await pipeline.toFile(outputPath);
}

async function main() {
  await ensureOutputDir();
  const files = await readInputFiles();

  if (files.length === 0) {
    console.error(`No images found in ${INPUT_DIR}`);
    process.exit(1);
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    sourceDir: "photos",
    outputDir: "public/images",
    images: [],
  };

  for (let i = 0; i < files.length; i += 1) {
    const fileName = files[i];
    const inputPath = path.join(INPUT_DIR, fileName);

    const base = slugify(fileName) || `photo-${String(i + 1).padStart(2, "0")}`;
    const outputFileName = `${String(i + 1).padStart(2, "0")}-${base}.webp`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    const buf = await toBuffer(inputPath, fileName);

    // Write a temporary buffer-backed file so `sharp()` can sniff format reliably.
    const tmpPath = path.join(OUTPUT_DIR, `.__tmp_${outputFileName}.bin`);
    await fs.writeFile(tmpPath, buf);

    await convertOne({ inputPath: tmpPath, outputPath, maxWidth: 2200 });
    await fs.unlink(tmpPath);

    const meta = await sharp(outputPath).metadata();

    manifest.images.push({
      source: `photos/${fileName}`,
      src: `/images/${outputFileName}`,
      width: meta.width ?? null,
      height: meta.height ?? null,
      alt: "Lukas and Maria",
    });

    console.log(`✓ ${fileName} -> public/images/${outputFileName}`);
  }

  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nSaved manifest: public/images/manifest.json`);
}

await main();


