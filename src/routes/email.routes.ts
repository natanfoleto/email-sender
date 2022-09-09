import { Router } from 'express'
import multer from 'multer'

import { SenderController } from '@modules/email/useCases/sender/senderController'

const upload = multer()
const emailRoutes = Router()

emailRoutes.post('/', upload.array('file', 2), new SenderController().handle)

export { emailRoutes }
