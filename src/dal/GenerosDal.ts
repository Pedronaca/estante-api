import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class GenerosDal {
    static async selectAll() {
        try {
            return await prisma.genero.findMany();
        } catch (error: any) {
            console.error(`Erro ao buscar geberos: ${error.message}`);
            throw error.message;
        }
    }
}