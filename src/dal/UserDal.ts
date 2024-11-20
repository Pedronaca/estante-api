import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserDal {
    static async selectById(id: string) {
        try {
            const res = await prisma.usuarios.findUnique({
                where: {
                    id: id
                }
            })

            return res;
        } catch (error) {
            console.error("Erro ao encontrar usuário:", error);
            throw error;
        }
    }

    static async selectByEmail(email: string) {
        try {
            const res = await prisma.usuarios.findUnique({
                where: {
                    email: email
                }
            })

            return res;
        } catch (error) {
            console.error("Erro ao encontrar usuário:", error);
            throw error;
        }
    }

    static async create(name: string, email: string, password: string) {
        try {
            const res = await prisma.usuarios.create({
                data: {
                    nome: name,
                    email: email,
                    senha: password
                }
            })

            return res;
        } catch (error) {
            console.error("Erro ao inserir usuário:", error);
            throw error;
        }
    }
}
