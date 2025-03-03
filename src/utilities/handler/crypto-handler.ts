import CryptoJs from 'crypto-js'
export class CryptoHandler{

    CryptoEncrypt=(value:string,key:string):string=>{
        return CryptoJs.AES.encrypt(value.toString(),key).toString()
    }

    CryptoDecrypt=(value:string,key:string):any=>{
        return CryptoJs.AES.decrypt(value,key).toString(CryptoJs.enc.Utf8)
    }
}