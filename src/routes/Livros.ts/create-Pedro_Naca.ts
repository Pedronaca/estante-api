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

export default async function createLivroRoute(fastify: FastifyInstance, pool: Pool) {
  fastify.post('/livros', async (request, reply) => {
    try {
      const { nome, num_pagina, autor, data_publi, id_usuario, id_gen, lidos } =
        request.body as Omit<Livro, 'id'>;

      const { rows } = await pool.query<Livro>(
        `INSERT INTO livros (nome, num_pagina, autor, data_publi, id_usuario, id_gen, lidos) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [nome, num_pagina, autor, data_publi, id_usuario, id_gen, lidos]
      );

      reply.status(201).send(rows[0]);
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: 'Erro ao adicionar livro' });
    }
  });
}
