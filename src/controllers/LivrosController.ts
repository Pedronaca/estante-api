import { FastifyReply, FastifyRequest } from "fastify";
import { LivrosRequestBody, LivrosRequestParams } from "../routes/LivrosRoutes.js";
import { LivrosModel } from "../models/LivrosModel.js";
import { LivrosBll } from "../bll/LivrosBll.js";

export class LivrosController {
    static async selectLivros(request: FastifyRequest<{ Params: LivrosRequestParams }>, reply: FastifyReply) {
        try {
            const livros: LivrosModel[] = await LivroBll.selectLivros(request.params.idUsuario);
            reply.code(200).send(livros);
        } catch (error: any) {
            reply.code(500).send({ error: "Erro interno do servidor" });
        }
    }

    // static async create(request: FastifyRequest<{ Body: LivrosRequestBody }>, reply: FastifyReply) { }

    // static async delete(request: FastifyRequest<{ Params: LivrosRequestParam }>, reply: FastifyReply) { }
}