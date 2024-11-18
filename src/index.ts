import fastifyCors from '@fastify/cors';
import { fastify } from 'fastify'
import { db } from './dal/db.js';
import LivrosRoutes from './routes/LivrosRoutes.ts';

const server = fastify();

db.dbTime();

server.register(LivrosRoutes);

server.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});

server.listen({
    port: 3333,
    host: '0.0.0.0'
}, (error, address) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`Server running at ${address} 🚀`);
});