import { UserDal } from "../dal/UserDal.js";

export class UserBll {
    static async deleteUser(id: number) {
        return await UserDal.deleteUser(id);
    }

    static async updateUser(id: number, userData: any) {
        return await UserDal.updateUser(id, userData);
    }

    static async selectById(id: number) {
        return await UserDal.selectById(id);
    }

    static async selectByEmail(email: string) {
        return await UserDal.selectByEmail(email);
    }
}
