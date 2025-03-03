import * as admin from 'firebase-admin';
import { ListService } from '../../service/list-service';
const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const messaging = admin.messaging()
export class sentPushNotification {

  send = async (data: any, title: string, content: string, user: string) => {
    const list_serivice = new ListService()
    const device_details = await list_serivice.Devicetoken({user_id:user})
    let same_token = [];
    device_details.forEach(item => {
      if (!same_token.includes(item.device_token)) {
        same_token.push(item?.device_token)
        const stringifiedData = Object.fromEntries(
          Object.entries(data).map(([key, value]) => [key, String(value)])
        );
        let message = {
          notification: {
            title,
            body: content
          },
          data:stringifiedData,
          token: item?.device_token
        }
        messaging.send(message).then((response) => {
          console.log("success", response)
        }).catch((e) => {
          console.error("Error sending Message", e)
        })
      }

    })
  }

}