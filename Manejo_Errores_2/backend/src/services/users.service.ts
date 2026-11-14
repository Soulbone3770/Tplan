import { ConflictError, UnauthenticatedError } from "../errors/AppError.js";
import type { LoginInputType, LoginReturnType } from "../models/auth.model.js";
import type { PublicUserType, UserInputType, UserType } from "../models/users.model.js";
import { usersRepository } from "../repositories/users.repository.js";
import bcrypt from 'bcrypt';
import envGetter from "../config/envGetter.js";
import pkg from 'jsonwebtoken';

const jwt = pkg;

const { JWT_SECRET_KEY } = envGetter();

const toPublicUser = ({passwordHash, ...rest}: UserType): PublicUserType => rest

const usersService = {

    async createUser(userInput: UserInputType): Promise<PublicUserType>{

        const userEmail = await usersRepository.selectByEmail(userInput.email);

        if(userEmail !== null) throw new ConflictError("El email ya esta registrado");

        const passwordHash = await bcrypt.hash(userInput.password, 10);

        const user = await usersRepository.insertUser({
            username: userInput.username,
            email: userInput.email,
            passwordHash: passwordHash
        });

        return toPublicUser(user);

    },

    async createSesion(userInput: LoginInputType): Promise<LoginReturnType> {

        const user = await usersRepository.selectByUsernameAndEmail(userInput.username, userInput.email);
        const ok = user && (await bcrypt.compare(userInput.password, user.passwordHash));

        if(!ok) throw new UnauthenticatedError("El nombre de usuario, email o contraseña invalido/s");

        const token = jwt.sign(
            {userId: user.id},
            JWT_SECRET_KEY,
            { expiresIn: userInput.recuerdame ? "730h" : "1h" }
        );

        const maxAge = userInput.recuerdame ? 1000 * 60 * 60 * 24 * 30 : undefined;

        return { token, maxAge };
        
    }

};

export default usersService;