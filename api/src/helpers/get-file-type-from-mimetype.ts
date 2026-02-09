export function getFileTypeFromMimetype(mimetype: string): 'image' | 'video' | 'raw' | null {
    if (!mimetype) {
        return null;
    }

    const lowerMimetype = mimetype.toLowerCase();

    if (lowerMimetype.startsWith('image/') || mimetype === 'application/pdf') {
        return 'image';
    }

    if (lowerMimetype.startsWith('video/')) {
        return 'video';
    }

    // Consider common raw data mimetypes or application-specific raw formats
    if (
        lowerMimetype === 'application/octet-stream' || // Generic binary data
        lowerMimetype.startsWith('application/vnd.') || // Vendor-specific formats
        lowerMimetype.startsWith('text/') && lowerMimetype !== 'text/plain' // Non-plain text
        // Add more specific raw/binary mimetypes as needed
    ) {
        return 'raw';
    }

    // If it's not explicitly image or video, and doesn't fit common raw patterns,
    // we can consider other types as 'raw' for simplicity in this function.
    // You might want to handle 'office', 'pdf' specifically if needed.
    if (
        lowerMimetype.includes('office') ||
        lowerMimetype === 'application/pdf' ||
        lowerMimetype.startsWith('application/') ||
        lowerMimetype.startsWith('audio/') ||
        lowerMimetype.startsWith('model/')
        // Add more specific non-image/video mimetypes if required
    ) {
        return 'raw';
    }

    return null; // If the mimetype doesn't match any of the categories
}