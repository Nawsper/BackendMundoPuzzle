import { createHash, isValidPass } from '../../utils.js';
import { UserModel } from './models/user.models.js'

export default class UserDao {
    async registerUser(user) {
        try {
            const { email, password } = user;
            const existUser = await UserModel.findOne({ email });
            if (!existUser) {
                if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
                    const newUser = await UserModel.create({
                        ...user,
                        password: createHash(password),
                        role: 'admin'
                    });
                    return newUser;
                }
                const newUser = await UserModel.create({
                    ...user,
                    password: createHash(password),
                });
                return newUser;
            } else {
                return false;
            }
        } catch (error) {
            console.log(error);
        }
    }

    // async loginUser(user) {
    //     try {
    //         const { email, password } = user;
    //         const userExist = await this.getByEmail({ email });
    //         if (userExist) {
    //             const isValid = isValidPass(password, userExist);
    //             if (!isValid) return false;
    //             else return userExist
    //         } return false;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    //passport jwt
    async loginJwt(user) {
        try {
            const { email, password } = user;
            const userExist = await this.getByEmail(email);
            if (userExist) {
                const passValid = isValidPass(password, userExist)
                if (!passValid) return false
                else return userExist
            } return false
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    //

    async getByEmail(email) {
        try {
            const userExist = await UserModel.findOne({ email });
            if (userExist) {
                return userExist
            } return false
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }

    async getById(id) {
        try {
            const userExist = await UserModel.findById(id)
            if (userExist) {
                return userExist
            } return false
        } catch (error) {
            console.log(error)
        }
    }
}