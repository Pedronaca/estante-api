import { FastifyInstance } from 'fastify';
import { Pool } from 'pg';

interface Livro {
  id: number;
  nome: string;
  num_pagina: number;
  autor: string;
  data_publi: string;
  id_usuario: number;
  id_gen: number;
  lidos: boolean;
}

export default async function updateLivroRoute(fastify: FastifyInstance, pool: Pool) {
  fastify.put('/livros/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const { nome, num_pagina, autor, data_publi, id_usuario, id_gen, lidos } =
        request.body as Omit<Livro, 'id'>;

      const { rows } = await pool.query<Livro>(
        `UPDATE livros 
         SET nome = $1, num_pagina = $2, autor = $3, data_publi = $4, id_usuario = $5, id_gen = $6, lidos = $7 
         WHERE id = $8 RETURNING *`,
        [nome, num_pagina, autor, data_publi, id_usuario, id_gen, lidos, id]
      );

      if (rows.length === 0) {
        return reply.status(404).send({ message: 'Livro não encontrado' });
      }

      reply.send(rows[0]);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao atualizar livro' });
    }
  });
}
