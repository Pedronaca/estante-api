import fastifyCors from '@fastify/cors';
import { fastify } from 'fastify';
import LivrosRoutes from './routes/LivrosRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import authRoutes from './routes/AuthRoutes.js';
import GenerosRoutes from './routes/GenerosRoutes.js';

const server = fastify();

server.register(LivrosRoutes);
server.register(UserRoutes);
server.register(authRoutes);
server.register(GenerosRoutes);

server.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

server.listen({
    port: 3333,
    host: '0.0.0.0',
}, (error, address) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`Server running at ${address} 🚀`);
});
