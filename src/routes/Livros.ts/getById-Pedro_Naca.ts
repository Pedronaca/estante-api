import { FastifyInstance } from 'fastify';
import { Pool } from 'pg';

export default async function getByIdLivroRoute(fastify: FastifyInstance, pool: Pool) {
  fastify.get('/livros/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const { rows } = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);

      if (rows.length === 0) {
        return reply.status(404).send({ message: 'Livro não encontrado' });
      }

      reply.send(rows[0]);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao buscar livro por ID' });
    }
  });
}
