import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import env from '@config/config'

import { router } from '@routes/index'

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('combined'))
app.use(express.json())
app.use(express.json({ limit: env.MAX_REQUEST_SIZE }))
app.use(env.VERSION, router)

export default app
