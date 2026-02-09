
import { Request, Response } from "express";
import { prisma } from '../../lib/CustomPrismaClient'
import { filesUploader } from "../helpers/files-uploader";

// @route GET /document
export const getDocuments = async (req: Request, res: Response) => {
    const documents = await prisma.document.findMany({
        include: {
            user: {
                select: {
                    name: true,
                }
            }
        }
    })
    res.json(documents)
}

// @route POST /document
export const createDocument = async (req: Request, res: Response) => {
    const { title, category, userId, location } = req.body

    let newFiles: { name: string; url: string; type: "image" | "video" | "raw" | "auto"; date: Date; }[] = [];

    if (req.files) {
        console.log('req.files', req.files)
        newFiles = await filesUploader(req.files as Express.Multer.File[], `${userId}`);
        console.log('newFiles', newFiles)
        if (!newFiles) {
            res.status(404).json({ message: "Error uploading files" });
            return;
        }
    }

    const userData = await prisma.user.findFirst({
        where: {
            clerkId: userId as string
        }
    })

    if (!userData) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    const document = await prisma.document.create({
        data: {
            title,
            category: category,
            userId: userData.id,
            location: location,
            url: newFiles[0].url
        },
    })

    res.json(document)
}