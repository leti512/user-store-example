
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { UserModel } from "../../data";
import { bcryptAdapter } from "../../config";

export class AuthService{

    // DI
    constructor() {}

    public async registerUser( registerUserDto: RegisterUserDto ){

        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        
        if ( existUser ) throw CustomError.badRequest('Email already exist');

        try {

            const user = new UserModel(registerUserDto);
            
            // Encriptar la contraseña 
            user.password = bcryptAdapter.hash(registerUserDto.password);
            
            await user.save();


            const {password, ...rest} = UserEntity.fromObject(user);

            //const userEntity = UserEntity.fromObject(user);

            return {
                user: rest,
                token: 'ABC'
            };

        } catch (error) {
            throw CustomError.internalServer(`${ error }`);
        }

    }
}