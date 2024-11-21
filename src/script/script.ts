import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ScriptLivros } from "../dal/ScriptDal.js";

export interface LivrosRequestParams {
    idUsuario: string;
}

export default async function ScriptRoute(fastify: FastifyInstance) {
    fastify.post('/gerarLivros/:idUsuario', async (request: FastifyRequest<{ Params: LivrosRequestParams }>, reply: FastifyReply) => {
        try {
            const res = await ScriptLivros.gerarLivros(request.params.idUsuario)

            if (res) {
                return reply.code(200).send(res);
            }

            return reply.code(401).send({ message: "Não foi possível gerar livros" });
        } catch (error) {
            console.error(error);
            return reply.code(500).send({ message: "Erro interno do servidor" });
        }
    });
}
