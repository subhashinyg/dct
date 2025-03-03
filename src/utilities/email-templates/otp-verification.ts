export const otpVerfication = (code:string):string=>{
    return `
   <html>
   <head>
       <title>Verification</title>
   </head>
   <body>
       <p>We received a request to verify OTP. Please use the following One-Time Password (OTP) to verifiy your invitation:</p>
       <p><strong>${code}</strong></p>
       <p>This OTP is valid for 15 minutes. If you didn't request a verification, you can safely ignore this email.</p>
       <p>Thank you,</p>
   </body>
   </html>`
   }