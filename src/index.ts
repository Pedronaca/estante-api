import fastifyCors from '@fastify/cors';
import { fastify } from 'fastify';
import { db } from './dal/db.ts';
import LivrosRoutes from './routes/LivrosRoutes.ts';
import fastifyJwt from "@fastify/jwt";

const server = fastify();

server.register(fastifyJwt, {
    secret: 'My$eCur3t0kenKey!1234@#',
});

server.decorate("authenticate", async (request, reply) => {
    try {
        await request.jwtVerify();
    } catch (error) {
        reply.send(error);
    }
});

db.dbTime();

server.register(LivrosRoutes);

server.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

server.post('/login', async (request, reply) => {
    const { username, password } = request.body as { username: string; password: string };

    if (username === 'usuario' && password === 'senha') {
        const token = server.jwt.sign({ username });
        return reply.send({ token });
    }

    reply.status(401).send({ message: 'Credenciais inválidas' });
});

server.get('/protected', { preHandler: [server.authenticate] }, async (request, reply) => {
    return reply.send({ message: 'Você acessou uma rota protegida!' });
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
