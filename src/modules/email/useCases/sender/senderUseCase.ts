import { Express } from 'express'
import { send } from '@libs/nodemailer'

class SenderUseCase {
  async execute (config: Express.Multer.File, list: Express.Multer.File) {
    try {
      const options = JSON.parse(config.buffer.toString())
      const emails = list.buffer.toString().split(/\r?\n|\r|\n/g)

      await send(
        options,
        emails
      )

      return {
        emails, options
      }
    } catch (error) {
      console.log(error)

      return false
    }
  }
}

export { SenderUseCase }
