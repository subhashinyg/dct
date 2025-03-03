const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
export class SendGridService {
    sendMail = (to: string, subject: string, html: string) => {
        console.log('mail service')
        const msg = {
            to, // Change to your recipient
            from: 'eventstaff@me.com', // Change to your verified sender
            subject,
            html,
        }

        sgMail
            .send(msg)
            .then((response) => {
                console.log('mail sended',response)
            })
            .catch((error) => {
                console.error(error.response.body)

            })
    }
}