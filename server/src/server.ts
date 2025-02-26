import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import products from "../../client/src/products.json" with { type: "json" };
import sequelize from "./db";
import { userRoutes } from './modules/user/user.route';
import jwt, { FastifyJWT } from '@fastify/jwt';
import fCookie from '@fastify/cookie';
import multipart from '@fastify/multipart';
import path from 'path';
import fastifyStatic from '@fastify/static';
// Main Server Setup
const server = Fastify();

server.register(jwt, {
    secret: 'supersecret',
    cookie: {
        cookieName: 'Authorization',
        signed: true
    },
    sign: {
        expiresIn: '1h'
    }
});

server.register(multipart);

server.decorate('authenticate',
    async (request, reply) => {
        // Skip auth for the logout route
        if (request.raw.url === '/api/users/logout') {
            return;
        }

        const accessToken = request.cookies.Authorization;

        if (!accessToken) {
            reply.code(401).send({ message: 'Unauthorized, no access token' });
            return;
        }

        const requestToken = request.headers['authorization'];
        if (!requestToken) {
            reply.code(401).send({ message: 'Unauthorized, no request token' });
        }

        try {
            const decodedAccessToken = await request.jwtVerify(accessToken);
            const decodedRequestToken = await request.jwtVerify(requestToken);
            if (decodedAccessToken.id !== decodedRequestToken.id) {
                throw new Error('Unauthorized, tokens do not match');
            }
            request.user = decodedAccessToken;

        } catch (error) {
            if (error.message === 'Unauthorized, tokens do not match' || error.message === 'jwt expired') {
                const decodedAccessToken = request.jwtVerify(accessToken);
                const newRequestToken = request.jwtSign({ id: decodedAccessToken.id });
                reply.header('x-new-requestToken', newRequestToken);
                request.user = decodedAccessToken;

            } else {
                return reply.code(401).send({ message: 'Unauthorized, invalid token' });
            }
        }
    }
);

server.addHook('preHandler', (request, reply, next) => {
    request.jwt = server.jwt
    return next()
});

server.register(fCookie, {
    secret: 'some-secret',
    hook: 'preHandler',
})

server.register(fastifyCors, {
    origin: "http://localhost:3002",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
});

const syncDatabase = async () => {
    try {
        await sequelize.sync({alter:true});
        console.log('Database synced');
    } catch (error) {
        console.error('Error syncing database: ', error);
    }
};

syncDatabase();

const listeners = ['SIGINT', 'SIGTERM'];
listeners.forEach((signal) => {
    process.on(signal, async () => {
        await server.close();
        process.exit(0)
    })
})

// Health Check Route
server.get("/health", async (request, reply) => {
    reply.send({ status: "ok" });
});

// Product Routes
server.get("/api/products", async (request, reply) => {
    const { selectedCategory } = request.query as { selectedCategory?: string };

    const filteredProducts = selectedCategory === "all"
        ? products
        : products.filter(product => product.category === selectedCategory);

    reply.send(filteredProducts);
});

server.register(userRoutes, { prefix: '/api/users' });

server.register(fastifyStatic, {
    root: path.join(process.cwd(), 'uploads', 'profilepics'),
    prefix: '/uploads/profilepics/',
    decorateReply: false
})

const start = async () => {
    try {
        await server.listen({ port: 3000, host: 'localhost' });
        console.log('Server running on http://localhost:3000');
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
