import { UserModel } from './models/user.models.js'

export default class UserDao {
    async registerUser(user) {
        try {
            const { email } = user;
            const existUser = await UserModel.findOne({ email });
            if (!existUser) {
                if (email === 'adminCoder@coder.com') {
                    const newUser = await UserModel.create({ ...user, role: 'admin' });
                    return newUser;
                }
                const newUser = await UserModel.create(user);
                return newUser;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async loginUser(email, password) {
        try {
            const user = await UserModel.findOne({ email, password });
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
