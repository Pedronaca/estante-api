import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { LivrosController } from "../controllers/LivrosController";

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
    };
}

export default async function LivrosRoutes(fastify: FastifyInstance) {
    // Rota GET para obter todos os livros com autenticação
    fastify.get('/livros', { preHandler: [fastify.authenticate] }, async (request, reply) => {
        await LivrosController.getAll(request, reply);
    });

    // Rota GET para obter livros de um usuário específico com autenticação
    fastify.get('/livros/user/:idUsuario', { preHandler: [fastify.authenticate] }, async (request: FastifyRequest<{ Params: LivrosRequestParams }>, reply: FastifyReply) => {
        await LivrosController.selectLivros(request, reply);
    });

    // Rota POST para criar um novo livro com autenticação
    fastify.post('/livros', { preHandler: [fastify.authenticate] }, async (request: FastifyRequest<{ Body: LivrosRequestBody }>, reply: FastifyReply) => {
        await LivrosController.createLivro(request, reply);
    });

    // Rota PUT para atualizar um livro existente com autenticação
    fastify.put('/livros/:id', { preHandler: [fastify.authenticate] }, async (request: FastifyRequest<{ Body: LivrosRequestBody }>, reply: FastifyReply) => {
        await LivrosController.updateLivro(request, reply);
    });

    // Rota DELETE para remover um livro com autenticação
    fastify.delete('/livros/:id', { preHandler: [fastify.authenticate] }, async (request: FastifyRequest<{ Params: LivrosRequestParams }>, reply: FastifyReply) => {
        await LivrosController.deleteLivro(request, reply);
    });
}
