import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Subject } from "typeorm/persistence/Subject";

interface IAutenticateRequest {
    email: string;
    password: string;
}

class AutenticateUserService {
    async execute({email, password} : IAutenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);

        const user = await usersRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error("Email/Password Incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email/Password Incorrect");
        }

        const token = sign(
            {email: user.email}, 
            "d1921aa0ca3c1146a01520c04e6caa9e",
            {subject: user.id, expiresIn: "1d"}

        )

        return token;
    }

}

export { AutenticateUserService}