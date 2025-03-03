import express, { Application } from 'express'
import * as dotenv from 'dotenv'
import middlewares from '../middleware'
import { AppEndPoints } from '../../router'

dotenv.config()
const app: Application = express()

const startServer = () => {
    let port = portNumber()
    middlewares(app)
    AppEndPoints(app)
    const server = app.listen(port, () => console.log(`server connected ${port}`))
}

const portNumber = (): number => {
    return Number(process.env.PORT) || 8080
}


export { startServer }