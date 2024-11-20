import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class LivrosDal {
    static async selectLivros(idUsuario: any) {
        try {
            console.log(`Buscando livros para o usuário com ID: ${idUsuario}`);
            const res = await prisma.livros.findMany({
                where: {
                    id_usuario: idUsuario
                }
            });

            return res;
        } catch (error: any) {
            console.error(`Erro ao buscar livros: ${error.message}`);
            throw error.message;
        }
    }

    static async selectAll() {
        try {
            return await prisma.livros.findMany()
        } catch (error: any) {
            console.error(`Erro ao buscar livros: ${error.message}`);
            throw error.message;
        }
    }

    static async create(idUsuario: string, idGenero: number, nome: string, numPag: number, autor: string, dtPubli: Date, lido: boolean) {
        try {
            const res = await prisma.livros.create({
                data: {
                    id_usuario: idUsuario,
                    id_genero: idGenero,
                    nome: nome,
                    num_pag: numPag,
                    autor: autor,
                    dt_publi: dtPubli,
                    lido: lido
                }
            })

            return res;
        } catch (error) {
            console.error("Erro ao inserir usuário:", error);
            throw error;
        }
    }

    // static async update(user: UserModel): Promise<> { }

    // static async delete(id: number): Promise<> { }
}