import { Express } from 'express'

class SenderUseCase {
  async execute (file_email: Express.Multer.File, file_html: Express.Multer.File) {
    try {
      const emails = file_email.buffer.toString().split(/\r?\n|\r|\n/g)
      const html = file_html.buffer.toString()

      return { emails, html }
    } catch (error) {
      console.log(error)

      return false
    }
  }
}

export { SenderUseCase }
