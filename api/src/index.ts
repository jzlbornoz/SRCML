import 'dotenv/config'

import express from 'express'
import documentRouter from './routes/document'
import { prisma } from '../lib/CustomPrismaClient';

prisma.$connect();

const app = express()

app.use(express.json())

app.use('/document', documentRouter)

app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`))
