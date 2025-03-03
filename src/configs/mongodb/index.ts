import mongoose from "mongoose"

const startMongoDbServer = () => {
    const url = process.env.DBURL as string
    mongoose.connect(url)
    var db = mongoose.connection
    db.on('error', console.error.bind(console, 'db connection error'))
    db.once('open', () => {
        // dbInititate()
        console.log(`Db connected to url:${url}`)
    })
}

// const dbInititate = async () => {
//     await initCounterDatabase()
// }
export default startMongoDbServer