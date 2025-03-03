import { ERole } from "../constants/enum/auth-enum";
import { UserModel } from "../models/user/user-model";



export class DocumentCountService {

    userCount= async():Promise<number>=>{
        return await UserModel.countDocuments({ role: ERole.USER });
    }

    getUserCountByMonth = async (year: number): Promise<number[]> => {
        const data = new Array(12).fill(0);
        const users = await UserModel.aggregate([
            {
                $match: {
                    created_at: {
                        $gte: new Date(`${year}-01-01`),
                        $lt: new Date(`${year + 1}-01-01`)
                    },
                    role: ERole.USER
                }
            },
            {
                $group: {
                    _id: { $month: "$created_at" },
                    count: { $sum: 1 }
                }
            }
        ]);
        users.forEach(user => {
            data[user._id - 1] = user.count;
        });

        return data;
    };


}



