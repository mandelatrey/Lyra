import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * API route for uploading images to Vercel Blob
 * 
 * POST /api/upload
 * Body: FormData with 'file' field
 * 
 * Returns: { url: string } - The Blob URL of the uploaded file
 */
export async function POST(request: Request) {
    try {
        // Check for authentication token
        const token = process.env.BLOB_READ_WRITE_TOKEN;
        if (!token) {
            return NextResponse.json(
                { error: 'Blob storage not configured' },
                { status: 500 }
            );
        }

        // Get the file from the request
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file type
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/svg+xml'];
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Only images are allowed.' },
                { status: 400 }
            );
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File too large. Maximum size is 10MB.' },
                { status: 400 }
            );
        }

        // Upload to Vercel Blob
        const blob = await put(file.name, file, {
            access: 'public',
            token,
        });

        return NextResponse.json({
            url: blob.url,
            filename: file.name,
            size: file.size,
            contentType: file.type,
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 }
        );
    }
}
