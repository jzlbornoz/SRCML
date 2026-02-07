
import { Request, Response } from "express";
import { prisma } from '../../lib/CustomPrismaClient'

// @route GET /document
export const getDocuments = async (req: Request, res: Response) => {
    const documents = await prisma.document.findMany()
    res.json(documents)
}

// @route POST /document
export const createDocument = async (req: Request, res: Response) => {
    const { title, category, userId } = req.body

    const document = await prisma.document.create({
        data: {
            title,
            category: category,
            userId: userId,
        },
    })
    res.json(document)
}