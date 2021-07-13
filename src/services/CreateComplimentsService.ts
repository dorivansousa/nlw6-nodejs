import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplientRequest{
    user_sender: string;
    user_receiver: string;
    tag_id: string;
    message: string;
}

class CreateComplimentsService {
    async execute( {user_sender, user_receiver, tag_id, message} : IComplientRequest) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const userRepositories = getCustomRepository(UsersRepositories);

        if (user_receiver === user_sender){
            throw new Error("Incorrect User Receiver");
        }

        const userReceiverExists = await userRepositories.findOne(user_receiver);

        if (!userReceiverExists){
            throw new Error("User Receiver does not exists");
        }

        const compliment = complimentsRepositories.create({
            user_sender,
            user_receiver,
            tag_id,
            message
        })

        await complimentsRepositories.save(compliment);

        return compliment;        
    }
}

export {CreateComplimentsService}