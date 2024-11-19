import { FastifyReply, FastifyRequest } from "fastify";
import { UserBll } from "../bll/UserBll";

export class UserController {
    static async deleteUser(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
        const { id } = request.params;
        const result = await UserBll.deleteUser(id);
        reply.send(result);
    }

    static async updateUser(request: FastifyRequest<{ Params: { id: number }; Body: any }>, reply: FastifyReply) {
        const { id } = request.params;
        const userData = request.body;
        const result = await UserBll.updateUser(id, userData);
        reply.send(result);
    }

    static async selectById(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
        const { id } = request.params;
        const result = await UserBll.selectById(id);
        reply.send(result);
    }

    static async selectByEmail(request: FastifyRequest<{ Params: { email: string } }>, reply: FastifyReply) {
        const { email } = request.params;
        const result = await UserBll.selectByEmail(email);
        reply.send(result);
    }
}
