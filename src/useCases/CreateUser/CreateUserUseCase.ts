import { User } from "../../entities/User";
import { HTTP400Error } from "../../exceptions/HTTP400Error";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./ICreateUserDTO";

class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider,
    ) {}

    async execute(data: ICreateUserRequestDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new HTTP400Error('User already exists.');
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'Equipe do Meu App',
                email: 'equipe@meuapp.meu.app',
            },
            subject: 'Seja bem-vindo à plataforma',
            body: '<p>Você já pode fazer login em nossa plataforma.</p>'
        });
    }
}

export { CreateUserUseCase };