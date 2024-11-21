import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ScriptLivros {
    static async gerarLivros(idUsuario: string, quantidade: number = 10) {
        try {
            const usuarioExiste = await prisma.usuarios.findUnique({
                where: { id: idUsuario },
            });

            if (!usuarioExiste) {
                throw new Error(`Usuário com ID ${idUsuario} não encontrado.`);
            }

            const generosExistentes = await prisma.genero.findMany();
            if (generosExistentes.length === 0) {
                throw new Error('Nenhum gênero encontrado. Popule a tabela generos antes de gerar livros.');
            }

            const generos = generosExistentes.map((genero) => genero.id);

            const gerarNomeLivro = () => {
                const titulos = [
                    'A Jornada',
                    'O Mistério das Sombras',
                    'Caminhos Incertos',
                    'O Segredo do Vale',
                    'Noite Infinita',
                    'Horizontes Perdidos',
                    'O Último Guardião',
                    'Fragmentos do Tempo',
                    'Mar de Estrelas',
                    'Ecos do Amanhã',
                ];
                return titulos[Math.floor(Math.random() * titulos.length)];
            };

            const gerarAutor = () => {
                const autores = [
                    'João Silva',
                    'Maria Oliveira',
                    'Carlos Santos',
                    'Ana Costa',
                    'Paulo Almeida',
                    'Fernanda Souza',
                    'Lucas Pereira',
                    'Carla Lima',
                    'Roberto Machado',
                    'Juliana Ribeiro',
                ];
                return autores[Math.floor(Math.random() * autores.length)];
            };

            const livrosParaCriar = Array.from({ length: quantidade }, () => ({
                id_usuario: idUsuario,
                id_genero: generos[Math.floor(Math.random() * generos.length)],
                nome: gerarNomeLivro(),
                num_pag: Math.floor(Math.random() * 500) + 100, 
                autor: gerarAutor(),
                dt_publi: new Date(
                    2000 + Math.floor(Math.random() * 23),
                    Math.floor(Math.random() * 12),
                    Math.floor(Math.random() * 28) + 1
                ),
                lido: Math.random() > 0.5,
            }));

            const livrosCriados = await prisma.livros.createMany({
                data: livrosParaCriar,
            });

            console.log(`${livrosCriados.count} livros foram criados para o usuário ${idUsuario}.`);
            return livrosCriados;
        } catch (error: any) {
            console.error(`Erro ao gerar livros: ${error.message}`);
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
}
