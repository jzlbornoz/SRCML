import { v2 as cloudinary, UploadApiOptions } from "cloudinary";
import { getFileTypeFromMimetype } from "./get-file-type-from-mimetype";
import fs from 'fs/promises';

export const filesUploader = async (files: (Express.Multer.File & { description?: string })[], folder?: string) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    });

    const updatedFilesPromises = files.map(async element => {

        const resourceType = (getFileTypeFromMimetype(element.mimetype) as "image" | "video" | "raw" | "auto") || "auto";

        const config: UploadApiOptions = {
            resource_type: resourceType,
            public_id: element.originalname,
            overwrite: true,
            folder: folder ? 'srcml/' + folder : 'srcml',
            access_mode: 'public',
        }

        if (resourceType === 'image') {
            config.format = 'webp';
            config.quality = 'auto';
        }

        const result = await cloudinary.uploader.upload(element.path, config)

        if (!result) {
            throw new Error("Cloudinary Upload Error")
        }
        return result
    });

    const updatedFiles = await Promise.all(updatedFilesPromises)

    await Promise.allSettled(files.map(file => fs.unlink(file.path)));

    return updatedFiles.map(item => ({
        name: item.public_id,
        url: item.secure_url,
        type: item.resource_type,
        date: new Date()
    }))
};