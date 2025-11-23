#!/usr/bin/env node

/**
 * Upload images from public/ directory to Vercel Blob storage
 * 
 * Usage:
 *   node scripts/upload-to-blob.js              # Upload all images
 *   node scripts/upload-to-blob.js --dry-run    # Preview what would be uploaded
 */

import { config } from 'dotenv';
import { put } from '@vercel/blob';
import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
config({ path: join(__dirname, '..', '.env.local') });

// Directories to scan for images
const IMAGE_DIRS = ['grid', 'hero', 'avatars', 'logos'];
const PUBLIC_DIR = join(__dirname, '..', 'public');
const OUTPUT_FILE = join(__dirname, '..', 'blob-urls.json');

// Supported image extensions
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];

// Check if running in dry-run mode
const isDryRun = process.argv.includes('--dry-run');

/**
 * Get all image files from a directory
 */
async function getImagesFromDir(dirPath) {
  try {
    const files = await readdir(dirPath);
    return files.filter(file => {
      const ext = extname(file).toLowerCase();
      return IMAGE_EXTENSIONS.includes(ext);
    });
  } catch (error) {
    console.warn(`Warning: Could not read directory ${dirPath}:`, error.message);
    return [];
  }
}

/**
 * Upload a single image to Vercel Blob
 */
async function uploadImage(localPath, publicPath) {
  if (isDryRun) {
    console.log(`[DRY RUN] Would upload: ${publicPath}`);
    return `https://example.blob.vercel-storage.com/${publicPath.split('/').pop()}`;
  }

  try {
    const fileBuffer = await readFile(localPath);
    const filename = publicPath.split('/').pop();
    
    console.log(`Uploading: ${publicPath}...`);
    
    const blob = await put(filename, fileBuffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    console.log(`✓ Uploaded: ${publicPath} -> ${blob.url}`);
    return blob.url;
  } catch (error) {
    console.error(`✗ Failed to upload ${publicPath}:`, error.message);
    throw error;
  }
}

/**
 * Main function to upload all images
 */
async function main() {
  console.log('🚀 Starting Vercel Blob upload...\n');

  if (isDryRun) {
    console.log('🔍 DRY RUN MODE - No files will be uploaded\n');
  }

  // Check for token
  if (!isDryRun && !process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ Error: BLOB_READ_WRITE_TOKEN environment variable is not set');
    console.error('Please add it to your .env.local file');
    process.exit(1);
  }

  const urlMapping = {};
  let totalUploaded = 0;
  let totalFailed = 0;

  // Process each directory
  for (const dir of IMAGE_DIRS) {
    const dirPath = join(PUBLIC_DIR, dir);
    console.log(`📁 Processing directory: ${dir}/`);
    
    const images = await getImagesFromDir(dirPath);
    
    if (images.length === 0) {
      console.log(`   No images found in ${dir}/\n`);
      continue;
    }

    console.log(`   Found ${images.length} image(s)\n`);

    // Upload each image
    for (const image of images) {
      const localPath = join(dirPath, image);
      const publicPath = `/${dir}/${image}`;

      try {
        const blobUrl = await uploadImage(localPath, publicPath);
        urlMapping[publicPath] = blobUrl;
        totalUploaded++;
      } catch (error) {
        totalFailed++;
      }
    }

    console.log(''); // Empty line between directories
  }

  // Save mapping to JSON file
  if (Object.keys(urlMapping).length > 0) {
    await writeFile(OUTPUT_FILE, JSON.stringify(urlMapping, null, 2));
    console.log(`\n📝 URL mapping saved to: ${OUTPUT_FILE}`);
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Upload Summary:');
  console.log(`   ✓ Successfully uploaded: ${totalUploaded}`);
  if (totalFailed > 0) {
    console.log(`   ✗ Failed: ${totalFailed}`);
  }
  console.log('='.repeat(50));

  if (isDryRun) {
    console.log('\n💡 Run without --dry-run to actually upload the files');
  } else if (totalUploaded > 0) {
    console.log('\n✅ Upload complete! Next steps:');
    console.log('   1. Update component files to use the new Blob URLs');
    console.log('   2. Update next.config.ts to allow Blob domain');
    console.log('   3. Test the application');
  }

  process.exit(totalFailed > 0 ? 1 : 0);
}

// Run the script
main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
