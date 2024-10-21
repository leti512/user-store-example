
import { CustomError, RegisterUserDto } from "../../domain";
import { UserModel } from "../../data";

export class AuthService{

    // DI
    constructor() {}

    public async registerUser( registerUserDto: RegisterUserDto ){

        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        console.log(existUser)
        if ( existUser ) throw CustomError.badRequest('Email already exist');

        return 'todo ok!'

    }
}