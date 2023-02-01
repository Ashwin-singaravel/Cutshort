import { SignIn, SignUp } from "src/types";
import EmailValidator from 'email-validator';
import User from "src/model/v1/user";
import UserSensitive from "src/model/v1/user-sensitive";
import bcrypt from 'bcryptjs';
import Auth from "src/auth/v1";


export const signUp = async (signUp: SignUp) => {
    if (signUp.email == null || signUp.password == null || signUp.username == null) {
        throw 1002;
    }

    if (!EmailValidator.validate(signUp.email)) {
        throw 1003;
    }

    if (signUp.password.length < 8) {
        throw 1004;
    }

    if (await User.findOne({ email: signUp.email })) {
        throw 1005;
    }

    const user = await User.saveUserData(signUp);

    await UserSensitive.savePassword({
        user_id: user._id,
        encrypted_password: await bcrypt.hash(signUp.password, 10)
    })

    return user;
}

export const signIn = async (signIn: SignIn) => {
    if (signIn.email == null || signIn.password == null) {
        throw 1002;
    }

    if (!EmailValidator.validate(signIn.email)) {
        throw 1003;
    }

    const user = await User.findOne({ email: signIn.email }, { email: 1, username: 1 })

    if (user == undefined) {
        throw 1107;
    }

    const userSensitive = await UserSensitive.findOne({ user_id: user._id }, { encrypted_password: 1 })

    if (userSensitive == undefined) {
        throw 1108;
    }

    if (await bcrypt.compare(signIn.password, userSensitive.encrypted_password)) {

        await UserSensitive.signedIn(user._id)

        return {
            token: Auth.createToken({ userIdentifier: user._id }),
            user: user
        }
    } else {
        throw 1109;
    }
}