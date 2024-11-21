import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserDal } from "../dal/UserDal.js";


export interface UserRequestParams {
    id: string;
}


export default async function UserRoutes(fastify: FastifyInstance) {
    fastify.delete('/users/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        // await UserController.deleteUser(request, reply);
    });

    fastify.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const res = await UserDal.getUserGroup();

            if (res) {
                return reply.code(200).send(res);
            }

            return reply.code(401).send({ message: "Não foi possível selecionar usuários" });
        } catch (error) {
            console.error(error);
            return reply.code(500).send({ message: "Erro interno do servidor" });
        }
    });

    fastify.get('/user/:id', async (request: FastifyRequest<{ Params: UserRequestParams }>, reply: FastifyReply) => {
        // await UserController.selectById(request, reply);
        try {
            const res = await UserDal.selectById(request.params.id);

            console.log(res)

            if (res) {
                return reply.code(200).send(res);
            }

            return reply.code(401).send({ message: "Não foi possível selecionar usuário" });
        } catch (error) {
            console.error(error);
            return reply.code(500).send({ message: "Erro interno do servidor" });
        }
    });
}
