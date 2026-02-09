import { Router } from "express"
import { createDocument, getDocuments } from "../controllers/document"
import multer from "multer"

const upload = multer({ dest: 'uploads/', })
const documentRouter = Router()

documentRouter.route('/')
    .post(upload.array('files', 12), createDocument)
    .get(getDocuments)

export default documentRouter