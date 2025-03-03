import startMongoDbServer from "./mongodb"
import { startServer } from "./server/server"

const connect = () => {
    startMongoDbServer()
    startServer()
}

export { connect }