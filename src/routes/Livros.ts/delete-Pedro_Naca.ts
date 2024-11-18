import { FastifyInstance } from 'fastify';
import { Pool } from 'pg';

export default async function deleteLivroRoute(fastify: FastifyInstance, pool: Pool) {
  fastify.delete('/livros/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const { rowCount } = await pool.query('DELETE FROM livros WHERE id = $1', [id]);

      if (rowCount === 0) {
        return reply.status(404).send({ message: 'Livro não encontrado' });
      }

      reply.send({ message: 'Livro deletado com sucesso' });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao deletar livro' });
    }
  });
}
