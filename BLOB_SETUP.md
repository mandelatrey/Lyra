# Vercel Blob Integration Guide

This project uses Vercel Blob storage to serve images via CDN for improved performance and scalability.

## Setup Instructions

### 1. Get Your Vercel Blob Token

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to **Storage** → **Blob**
4. Create a new Blob store (if you haven't already)
5. Copy the `BLOB_READ_WRITE_TOKEN`

### 2. Add Token to Environment Variables

Add the token to your `.env.local` file:

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_XXXXXXXXXXXXXXXX
```

### 3. Upload Images to Blob Storage

Run the upload script to migrate all images from `public/` to Vercel Blob:

```bash
# Preview what will be uploaded (dry-run)
npm run upload:blob -- --dry-run

# Actually upload the images
npm run upload:blob
```

This will:
- Upload all images from `public/grid/`, `public/hero/`, `public/avatars/`, and `public/logos/`
- Create a `blob-urls.json` file with the mapping of local paths to Blob URLs
- Display a summary of uploaded files

### 4. Update Component Files

After uploading, update your component files to use the new Blob URLs:

```bash
npm run update:urls
```

This will automatically replace all local image paths in:
- `components/shopData.tsx`
- `components/Hero.tsx`
- `components/CuratorWidget.tsx`
- `context/AuthContext.tsx`

### 5. Test Your Application

```bash
# Start development server
npm run dev

# Build for production
npm run build
```

## Available Scripts

- **`npm run upload:blob`** - Upload images to Vercel Blob storage
- **`npm run upload:blob -- --dry-run`** - Preview upload without actually uploading
- **`npm run update:urls`** - Update component files with Blob URLs

## API Route for Future Uploads

An API route is available at `/api/upload` for uploading new images programmatically:

```typescript
const formData = new FormData();
formData.append('file', imageFile);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData,
});

const { url } = await response.json();
// Use the returned URL in your components
```

### Validation Rules:
- **Allowed types**: PNG, JPG, JPEG, GIF, WebP, SVG
- **Max size**: 10MB

## File Structure

```
scripts/
├── upload-to-blob.js        # Upload images to Blob storage
└── update-component-urls.js # Update component files with Blob URLs

app/api/upload/
└── route.ts                 # API endpoint for image uploads

blob-urls.json               # Mapping of local paths to Blob URLs
```

## Benefits of Using Vercel Blob

✅ **Global CDN** - Images served from edge locations worldwide  
✅ **Automatic Optimization** - Next.js Image component optimizes Blob images  
✅ **Scalability** - No local storage limits  
✅ **Performance** - Faster load times with CDN caching  
✅ **Version Control** - Keep your repository lightweight  

## Troubleshooting

### Error: BLOB_READ_WRITE_TOKEN not set
Make sure you've added the token to `.env.local` and restarted your dev server.

### Images not loading
1. Check that `blob-urls.json` was created successfully
2. Verify the Blob URLs in the mapping file are accessible
3. Ensure `next.config.ts` includes the Blob domain in `remotePatterns`

### Upload fails
1. Check your internet connection
2. Verify the token is valid and has write permissions
3. Check file sizes (max 10MB per file)

## Cleanup (Optional)

After verifying everything works, you can optionally remove the original images from the `public/` directory to save space in your repository. Keep the directories for any future local development needs.

**Note**: Keep `blob-urls.json` in your repository for reference and potential re-uploads.
