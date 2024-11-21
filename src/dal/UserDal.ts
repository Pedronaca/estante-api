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

    static async getUserGroup() {
        try {
            const res = await prisma.livros.groupBy({
                by: ['id_usuario'],
                _count: {
                    id: true,
                },
                orderBy: {
                    _count: {
                        id: 'desc',
                    },
                },
            });

            const userIds = res.map(group => group.id_usuario);

            const users = await prisma.usuarios.findMany({
                where: {
                    id: {
                        in: userIds.filter(id => id !== null),
                    },
                },
            });

            const result = res.map(group => {
                const user = users.find(user => user.id === group.id_usuario);
                return {
                    userId: group.id_usuario,
                    userName: user ? user.nome : 'Usuário não encontrado',
                    bookCount: group._count.id,
                };
            });

            return result;
        } catch (error) {
            console.error("Erro ao agrupar os usuários:", error);
            throw error;
        }
    }
}
