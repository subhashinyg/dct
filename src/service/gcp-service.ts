import * as dotenv from 'dotenv'
import { IUpload } from '../interface/common-interface';
dotenv.config()
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
export class GCPService {
    generateSignedUrl = async ({ bucket, file_name, path, dynamic_key }): Promise<IUpload> => {
        const image_url = `https://storage.googleapis.com/${bucket}/${path}/${dynamic_key}${file_name}`;
        const expiration = 60 * 60;
        const options = {
            version: 'v4',
            action: 'write',
            expires: Date.now() + expiration * 1000,
        };
        const upload_url = await storage
            .bucket(bucket)
            .file(`${path}/${dynamic_key}${file_name}`)
            .getSignedUrl(options);
        let url = {
            upload_url,
            url: image_url,
            key: `${path}/${dynamic_key}${file_name}`,
        };
        return url;
    };
}