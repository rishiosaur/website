import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	secure: false,
	port: 465,
	auth: {
		user: process.env.email,
		pass: process.env.password,
		type: 'login',
	},
})

export default (req: NextApiRequest, res: NextApiResponse) => {
	const { email, message, name } = req.body
	const mailOptions = {
		from: email,
		to: 'hey@rishi.cx',
		subject: `New message from ${name} - Email: ${email}`,
		text: message,
	}

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error)
			res.status(500)
		} else {
			console.log(`Email sent: ${info.response}`)
			res.end('hello')
			res.status(200)
		}
	})
}
