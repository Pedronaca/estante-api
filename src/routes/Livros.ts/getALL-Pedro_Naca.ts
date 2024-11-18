import { FastifyInstance } from 'fastify';
import { Pool } from 'pg';

export default async function getAllLivrosRoute(fastify: FastifyInstance, pool: Pool) {
  fastify.get('/livros', async (request, reply) => {
    try {
      const { rows } = await pool.query('SELECT * FROM livros');
      reply.send(rows);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao buscar livros' });
    }
  });
}
