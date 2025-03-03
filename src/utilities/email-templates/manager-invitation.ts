export const ManagerInvitation = (url:string):string=>{
    return `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Manager Invitation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #FF5900;
            padding: 10px;
            text-align: center;
            h1: #FFFFFF;
            color: #fff;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .button {
            display: inline-block;
            background-color: #FF5900;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Manager Invitation</h1>
        </div>
        <div class="content">
            <p>You've been invited to join our company</p>
            <p>Click the button below to accept the invitation:</p>
            <a href=${url} class="button">Accept Invitation</a>
        </div>
    </div>
</body>
</html>`
}
