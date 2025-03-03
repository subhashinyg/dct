export const resetPasswordEmailTemplate = (code:string):string=>{
    return `
   <html>
   <head>
       <title>Password Reset</title>
   </head>
   <body>
       <p>We received a request to reset your password. Please use the following One-Time Password (OTP) to reset your password:</p>
       <p><strong>${code}</strong></p>
       <p>This OTP is valid for 15 minutes. If you didn't request a password reset, you can safely ignore this email.</p>
       <p>Thank you,</p>
   </body>
   </html>`
   }