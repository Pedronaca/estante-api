import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { GenerosDal } from "../dal/GenerosDal.js";

export default async function GenerosRoutes(fastify: FastifyInstance) {
    fastify.get('/generos', async (request: FastifyRequest, reply: FastifyReply) => {
        return await GenerosDal.selectAll();
    });
}
