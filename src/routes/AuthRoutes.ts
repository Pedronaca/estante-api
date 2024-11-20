import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserDal } from "../dal/UserDal.js";
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthRequestBody {
    id?: string;
    name: string;
    email: string;
    password: string;
}

export default async function authRoutes(fastify: FastifyInstance) {
    fastify.post<{ Body: AuthRequestBody }>(
        '/login',
        async (request: FastifyRequest<{ Body: AuthRequestBody }>, reply: FastifyReply) => {
            try {
                const { email, password } = request.body;
                console.log(email, password)

                const user = await UserDal.selectByEmail(email);

                if (user && user.senha == password) {
                    const userId = user.id
                    const payload = { userId, email };
                    const token = jwt.sign(payload, process.env.JWT_SECRET!);

                    return reply.code(200).send({ user, token });
                }

                return reply.code(401).send({ message: "Credenciais inválidas" });
            } catch (error) {
                console.error("Erro no login:", error);
                return reply.code(500).send({ message: "Erro interno do servidor" });
            }
        }
    );

    fastify.post<{ Body: AuthRequestBody }>(
        '/register',
        async (request: FastifyRequest<{ Body: AuthRequestBody }>, reply: FastifyReply) => {
            try {
                const { name, email, password } = request.body;
                console.log(name, email, password)

                const user = await UserDal.create(name, email, password);

                if (user) {
                    return reply.code(201).send({ message: "Usuário registrado com sucesso", user });
                }

                return reply.code(400).send({ message: "Não foi possível registrar o usuário" });
            } catch (error) {
                console.error("Erro no registro:", error);
                return reply.code(500).send({ message: "Erro interno do servidor" });
            }
        }
    );
}
