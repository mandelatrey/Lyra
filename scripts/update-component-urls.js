#!/usr/bin/env node

/**
 * Update component files to use Blob URLs from blob-urls.json
 * 
 * Usage:
 *   node scripts/update-component-urls.js
 */

import { config } from 'dotenv';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
config({ path: join(__dirname, '..', '.env.local') });

const MAPPING_FILE = join(__dirname, '..', 'blob-urls.json');

// Files to update with their paths
const FILES_TO_UPDATE = [
  'components/shopData.tsx',
  'components/Hero.tsx',
  'components/CuratorWidget.tsx',
  'context/AuthContext.tsx',
];

/**
 * Replace image paths in a file with Blob URLs
 */
async function updateFile(filePath, urlMapping) {
  const fullPath = join(__dirname, '..', filePath);
  
  try {
    let content = await readFile(fullPath, 'utf-8');
    let replacementCount = 0;

    // Replace each local path with its Blob URL
    for (const [localPath, blobUrl] of Object.entries(urlMapping)) {
      // Match both "/path/to/image.png" and '/path/to/image.png'
      const regex = new RegExp(`["']${localPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'g');
      const matches = content.match(regex);
      
      if (matches) {
        content = content.replace(regex, `"${blobUrl}"`);
        replacementCount += matches.length;
      }
    }

    if (replacementCount > 0) {
      await writeFile(fullPath, content, 'utf-8');
      console.log(`✓ Updated ${filePath}: ${replacementCount} replacement(s)`);
      return replacementCount;
    } else {
      console.log(`  Skipped ${filePath}: No matches found`);
      return 0;
    }
  } catch (error) {
    console.error(`✗ Failed to update ${filePath}:`, error.message);
    return 0;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🔄 Updating component files with Blob URLs...\n');

  // Load URL mapping
  let urlMapping;
  try {
    const mappingContent = await readFile(MAPPING_FILE, 'utf-8');
    urlMapping = JSON.parse(mappingContent);
    console.log(`📝 Loaded ${Object.keys(urlMapping).length} URL mappings from blob-urls.json\n`);
  } catch (error) {
    console.error('❌ Error: Could not read blob-urls.json');
    console.error('Please run the upload script first: npm run upload:blob');
    process.exit(1);
  }

  let totalReplacements = 0;

  // Update each file
  for (const file of FILES_TO_UPDATE) {
    const count = await updateFile(file, urlMapping);
    totalReplacements += count;
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Update Summary:');
  console.log(`   Total replacements: ${totalReplacements}`);
  console.log('='.repeat(50));

  if (totalReplacements > 0) {
    console.log('\n✅ Component files updated successfully!');
    console.log('   Next steps:');
    console.log('   1. Review the changes');
    console.log('   2. Test the application: npm run dev');
    console.log('   3. Build to verify: npm run build');
  } else {
    console.log('\n⚠️  No replacements made. This might indicate:');
    console.log('   - Files were already updated');
    console.log('   - URL mapping is empty or incorrect');
  }
}

// Run the script
main().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
