import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "../controllers/UserController";

export default async function UserRoutes(fastify: FastifyInstance) {
    // Deletar usuário
    fastify.delete('/users/:id', { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
        await UserController.deleteUser(request, reply);
    });

    // Atualizar usuário
    fastify.put('/users/:id', { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
        await UserController.updateUser(request, reply);
    });

    // Selecionar usuário por ID
    fastify.get('/users/:id', { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
        await UserController.selectById(request, reply);
    });

    // Selecionar usuário por e-mail
    fastify.get('/users/email/:email', { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
        await UserController.selectByEmail(request, reply);
    });
}
