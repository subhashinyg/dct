import { CollectionCounter } from "../constants/enum/common-enum"
import { IDocumentCounter } from "../interface/server-interface"
import { DocumentCounterModel } from "../models/general/document-counter-model"

export class AppContextService {
    
    counter = async (reference: CollectionCounter): Promise<IDocumentCounter> => {
        return await DocumentCounterModel.findOne({ reference })
    }

    counters = async (): Promise<IDocumentCounter[]> => {
        return await DocumentCounterModel.find({})
    }

    createCounter = async (counter: IDocumentCounter): Promise<IDocumentCounter> => {
        return await DocumentCounterModel.create(counter)
    }

    getNextSequence = async (reference: CollectionCounter): Promise<string> => {
        const counter = await DocumentCounterModel.findOneAndUpdate(
            { reference },
            { $inc: { seq: 1 } },
            { new: true, upsert: true } 
        );
    
        const sequenceNumber = counter.seq.toString().padStart(6, '0'); 
    
        return sequenceNumber;
    };
    

}