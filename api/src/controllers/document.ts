
import { Request, Response } from "express";
import { prisma } from '../../lib/CustomPrismaClient'
import { filesUploader } from "../helpers/files-uploader";

// @route GET /document
export const getDocuments = async (req: Request, res: Response) => {
    const documents = await prisma.document.findMany()
    res.json(documents)
}

// @route POST /document
export const createDocument = async (req: Request, res: Response) => {
    const { title, category, userId, location } = req.body

    let newFiles: { name: string; url: string; type: "image" | "video" | "raw" | "auto"; date: Date; }[] = [];

    if (req.files) {
        newFiles = await filesUploader(req.files as Express.Multer.File[], `${userId}`);
        if (!newFiles) {
            res.status(404).json({ message: "Error uploading files" });
            return;
        }
    }
    console.log('newFiles', newFiles)
    const document = await prisma.document.create({
        data: {
            title,
            category: category,
            userId: userId,
            location: location,
            url: newFiles[0].url
        },
    })

    res.json(document)
}