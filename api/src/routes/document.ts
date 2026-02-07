import { Router } from "express"
import { createDocument, getDocuments } from "../controllers/document"

const documentRouter = Router()

documentRouter.route('/')
    .post(createDocument)
    .get(getDocuments)

export default documentRouter