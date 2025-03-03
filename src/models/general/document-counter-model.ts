import mongoose from "mongoose"
import { IDocumentCounter } from "../../interface/server-interface"
import { AppContextService } from "../../service/app-context-service"
import { CollectionCounter, CollectionCounterPrefix } from "../../constants/enum/common-enum"

const schema = new mongoose.Schema({
    reference: { type: String, unique: true, required: true },
    prefix: { type: String, required: false },
    seq: { type: Number, default: 1000 }
},
    {
        versionKey: false
    })

export const DocumentCounterModel = mongoose.model<IDocumentCounter & mongoose.Document>('documentCounter', schema)

export const initCounterDatabase = async () => {
    try {
        const appContext = new AppContextService()
        const counters = await appContext.counters()
        Object.values(CollectionCounter).forEach((value) => {
            const counter = counters.find((doc) => doc.reference === value)
            if (!counter) {
                const c: IDocumentCounter = {
                    reference: value,
                    prefix: CollectionCounterPrefix[value]
                }
                appContext.createCounter(c)
            }
        })
    } catch (e) {
        console.log('counter database initializing failed', e)
    }
}