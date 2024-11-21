import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class LivrosDal {
    static async selectLivros(idUsuario: string) {
        try {
            console.log(`Buscando livros para o usuário com ID: ${idUsuario}`);
            
            const livros = await prisma.livros.findMany({
                where: {
                    id_usuario: idUsuario,
                },
                include: {
                    favoritos: {
                        where: {
                            id_usuario: idUsuario,
                        },
                    },
                    quero_ler: {
                        where: {
                            id_usuario: idUsuario,
                        },
                    },
                },
            });
    
            const livrosComStatus = livros.map(({ favoritos, quero_ler, ...livro }) => ({
                ...livro,
                favorito: favoritos.length > 0,
                queroLer: quero_ler.length > 0,
            }));
    
            return livrosComStatus;
        } catch (error: any) {
            console.error(`Erro ao buscar livros: ${error.message}`);
            throw error.message;
        }
    }
    
    static async getFavoriteBooks(idUsuario: string) {
        try {
            const livros = await prisma.livros.findMany({
                where: {
                    favoritos: {
                        some: {
                            id_usuario: idUsuario,
                        },
                    },
                },
                include: {
                    favoritos: {
                        where: {
                            id_usuario: idUsuario,
                        },
                    },
                    quero_ler: {
                        where: {
                            id_usuario: idUsuario,
                        },
                    },
                },
            });
    
            const livrosComStatus = livros.map(({ favoritos, quero_ler, ...livro }) => ({
                ...livro,
                favorito: favoritos.length > 0,
                queroLer: quero_ler.length > 0,
            }));
    
            return livrosComStatus;
        } catch (error: any) {
            console.error(`Erro ao buscar livros que quero ler: ${error.message}`);
            throw error.message;
        }
    }

    static async getReadBooks(idUsuario: string) {
        try {
            const livros = await prisma.livros.findMany({
                where: {
                    quero_ler: {
                        some: {
                            id_usuario: idUsuario,
                        },
                    },
                },
                include: {
                    favoritos: {
                        where: {
                            id_usuario: idUsuario,
                        },
                    },
                    quero_ler: {
                        where: {
                            id_usuario: idUsuario,
                        },
                    },
                },
            });
    
            const livrosComStatus = livros.map(({ favoritos, quero_ler, ...livro }) => ({
                ...livro,
                favorito: favoritos.length > 0,
                queroLer: quero_ler.length > 0,
            }));
    
            return livrosComStatus;
        } catch (error: any) {
            console.error(`Erro ao buscar livros que quero ler: ${error.message}`);
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
                    quero_ler: {
                        where: {
                            id_usuario: userId,
                        },
                    },
                },
            });
    
            const livrosComStatus = livros.map(({ favoritos, quero_ler, ...livro }) => ({
                ...livro,
                favorito: favoritos.length > 0,
                queroLer: quero_ler.length > 0,
            }));
    
            return livrosComStatus;
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

    static async desfavoritar(idLivro: string, idUsuario: string) {
        try {
            const favorito = await prisma.favoritos.deleteMany({
                where: {
                    id_livro: idLivro,
                    id_usuario: idUsuario
                }
            });
    
            return favorito;
        } catch (error) {
            console.error("Erro ao favoritar o livro:", error);
            throw error;
        }
    }

    static async ler(idLivro: string, idUsuario: string) {
        try {
            const favorito = await prisma.quero_ler.create({
                data: {
                    id_livro: idLivro,
                    id_usuario: idUsuario,
                },
            });
    
            return favorito;
        } catch (error) {
            console.error("Erro ao marcar leitura do livro:", error);
            throw error;
        }
    }

    static async desLer(idLivro: string, idUsuario: string) {
        try {
            const favorito = await prisma.quero_ler.deleteMany({
                where: {
                    id_livro: idLivro,
                    id_usuario: idUsuario
                }
            });
    
            return favorito;
        } catch (error) {
            console.error("Erro ao desmarcar leitura do livro:", error);
            throw error;
        }
    }
}