import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Prisma } from "@prisma/client";
import { LivrosDal } from "../dal/LivrosDal.js";

export interface LivrosRequestParams {
    id: string;
    idUsuario: string;
}

export interface LivrosRequestBody {
    livro: {
        id: string;
        idUsuario: string;
        idGenero: number;
        nome: string;
        numPag: number;
        autor: string;
        dtPubli: Date;
        lido: boolean;
    };
    idUsuario: string;
}

export default async function LivrosRoutes(fastify: FastifyInstance) {
    fastify.get('/livros/:idUsuario', async (request: FastifyRequest<{ Params: LivrosRequestParams }>, reply) => {
        try {
            const idUsuario = request.params.idUsuario

            const res = await LivrosDal.selectAll(idUsuario)

            if (res) {
                return reply.code(200).send(res);
            }

            return reply.code(401).send({ message: "Não foi possível selecionar os livros" });
        } catch (error) {
            console.error(error);
            return reply.code(500).send({ message: "Erro interno do servidor" });
        }
    });

    fastify.get('/livros/:idUsuario/favoritos', async (request: FastifyRequest<{ Params: LivrosRequestParams }>, reply) => {
        try {
            const idUsuario = request.params.idUsuario

            const res = await LivrosDal.getFavoriteBooks(idUsuario);

            if (res) {
                return reply.code(200).send(res);
            }

            return reply.code(401).send({ message: "Não foi possível selecionar os livros favoritos" });
        } catch (error) {
            console.error(error);
            return reply.code(500).send({ message: "Erro interno do servidor" });
        }
    });

    fastify.get('/livros/usuario/:idUsuario',
        async (request: FastifyRequest<{ Params: LivrosRequestParams }>, reply: FastifyReply) => {
            try {
                const res = await LivrosDal.selectLivros(request.params.idUsuario)

                if (res) {
                    return reply.code(200).send(res);
                }

                return reply.code(401).send({ message: "Não foi possível selecionar os livros" });
            } catch (error) {
                console.error(error);
                return reply.code(500).send({ message: "Erro interno do servidor" });
            }
        });

    fastify.post('/livros', async (request: FastifyRequest<{ Body: LivrosRequestBody }>, reply: FastifyReply) => {
        try {
            const res = await LivrosDal.create(
                request.body.livro.idUsuario,
                request.body.livro.idGenero,
                request.body.livro.nome,
                request.body.livro.numPag,
                request.body.livro.autor,
                request.body.livro.dtPubli,
                request.body.livro.lido,
            )

            if (res) {
                return reply.code(200).send(res);
            }

            return reply.code(401).send({ message: "Não foi possível cadastrar livro" });
        } catch (error) {
            console.error(error);
            return reply.code(500).send({ message: "Erro interno do servidor" });
        }
    });

    fastify.put('/livros', async (request: FastifyRequest<{ Body: LivrosRequestBody }>, reply: FastifyReply) => {
        try {
            const res = await LivrosDal.update(
                request.body.livro.idUsuario,
                request.body.livro.idGenero,
                request.body.livro.nome,
                request.body.livro.numPag,
                request.body.livro.autor,
                request.body.livro.dtPubli,
                request.body.livro.lido,
                request.body.livro.id,
            )

            if (res) {
                return reply.code(200).send(res);
            }

            return reply.code(401).send({ message: "Não foi possível atualizar livro" });
        } catch (error) {
            console.error(error);
            return reply.code(500).send({ message: "Erro interno do servidor" });
        }
    });

    fastify.delete('/livros/:id', async (request: FastifyRequest<{ Params: LivrosRequestParams }>, reply: FastifyReply) => {
        try {
            const res = await LivrosDal.delete(request.params.id)

            if (res) {
                return reply.code(200).send(res);
            }

            return reply.code(401).send({ message: "Não foi possível cadastrar livro" });
        } catch (error) {
            console.error(error);
            return reply.code(500).send({ message: "Erro interno do servidor" });
        }
    });

    fastify.post('/livro/favoritar/:id/:idUsuario', async (request: FastifyRequest<{ Params: LivrosRequestParams }>, reply: FastifyReply) => {
        try {
            const res = await LivrosDal.favoritar(request.params.id, request.params.idUsuario)

            if (res) {
                return reply.code(200).send(res);
            }

            return reply.code(401).send({ message: "Não foi possível favoritar livro" });
        } catch (error) {
            console.error(error);
            return reply.code(500).send({ message: "Erro interno do servidor" });
        }
    });
}
