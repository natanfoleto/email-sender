import { Request, Response } from 'express'

import { SenderUseCase } from '@modules/email/useCases/sender/senderUseCase'

class SenderController {
  async handle (req: Request, res: Response): Promise<any> {
    const { files } = req

    const senderUseCase = new SenderUseCase()

    const data = await senderUseCase.execute(files[0], files[1])

    return res.send(data)
  }
}

export { SenderController }
