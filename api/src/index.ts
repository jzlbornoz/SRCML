import 'dotenv/config'
import express from 'express'
import cors from "cors"
import documentRouter from './routes/document'
import { prisma } from '../lib/CustomPrismaClient';

const app = express()

app.use(cors());

prisma.$connect();

app.use(express.json())

app.use('/document', documentRouter)

app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`))
