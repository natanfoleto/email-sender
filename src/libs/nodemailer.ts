import nodemailer from 'nodemailer'

interface Config {
  from: string;
  subject: string;
  text: string;
  html: string;
}

async function send (options: Config, to: string[]) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '5d759adbc2a748',
      pass: '97958572dd4c10'
    }
  })

  const { from, subject, text, html } = options

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html
  }).then((res) => {
    console.log(res)

    return true
  }).catch((err) => {
    console.log(err)

    return false
  })

  return info
}

export { send }
