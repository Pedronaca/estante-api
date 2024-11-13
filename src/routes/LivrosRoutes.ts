import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { LivrosController } from "../controllers/LivrosController.js";

export interface LivrosRequestParams {
    id: number;
    idUsuario: number;
}

export interface LivrosRequestBody {
    livro: {
        id: number;
        idUsuario: number;
        idGenero: number;
        nome: string;
        numPag: number;
        autor: string;
        dtPubli: Date;
        lido: boolean;
    }
}

export default async function LivrosRoutes(fastify: FastifyInstance) {
    // fastify.get('/livros', async (request: FastifyRequest, reply: FastifyReply) => {
    //     // await UserController.select(reply);
    // });

    fastify.get('/livros/user/:idUsuario', async (request: FastifyRequest<{ Params: LivrosRequestParams }>, reply: FastifyReply) => {
        await LivrosController.selectLivros(request, reply);
    });

    // fastify.post('/livros', async (request: FastifyRequest<{ Body: LivrosRequestBody }>, reply: FastifyReply) => {
    //     // await UserController.registrer(request, reply);
    // });

    // fastify.put('/livros/:id', async (request: FastifyRequest<{ Body: LivrosRequestBody }>, reply: FastifyReply) => {
    //     // await UserController.update(request, reply);
    // });

    // fastify.delete('/livros/:id', async (request: FastifyRequest<{ Params: LivrosRequestParams }>, reply: FastifyReply) => {
    //     // await UserController.delete(request, reply);
    // });
}