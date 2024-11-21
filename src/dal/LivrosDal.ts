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
    
    static async getFavoriteBooks(idUsuario: string) {
        try {
            const res = await prisma.livros.findMany({
                where: {
                    favoritos: {
                        some: {
                            id_usuario: idUsuario
                        }
                    }
                }
            });
    
            return res;
        } catch (error: any) {
            console.error(`Erro ao buscar livros favoritos: ${error.message}`);
            throw error.message;
        }
    }

    static async selectAll(userId: string) {
        try {
            const livros = await prisma.livros.findMany({
                include: {
                    favoritos: {
                        where: {
                            id_usuario: userId,
                        },
                    },
                },
            });
    
            const livrosComFavorito = livros.map(({ favoritos, ...livro }) => ({
                ...livro,
                favorito: favoritos.length > 0,
            }));
    
            return livrosComFavorito;
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
            console.error("Erro ao inserir livro:", error);
            throw error;
        }
    }

    static async update(idUsuario: string, idGenero: number, nome: string, numPag: number, autor: string, dtPubli: Date, lido: boolean, id: string) {
        try {
            const res = await prisma.livros.update({
                where: {
                    id: id
                },
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
            console.error("Erro ao atualizar livro:", error);
            throw error;
        }
    }

    static async delete(id: string) {
        try {
            const res = prisma.livros.delete({
                where: {
                    id: id
                }
            })

            return res;
        } catch (error) {
            console.error("Erro ao deletar livro:", error);
            throw error;
        }
    }

    static async favoritar(idLivro: string, idUsuario: string) {
        try {
            const favorito = await prisma.favoritos.create({
                data: {
                    id_livro: idLivro,
                    id_usuario: idUsuario,
                },
            });
    
            return favorito;
        } catch (error) {
            console.error("Erro ao favoritar o livro:", error);
            throw error;
        }
    }
}