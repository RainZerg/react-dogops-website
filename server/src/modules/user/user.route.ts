import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import {promises as fs, createWriteStream} from 'fs';
import util from 'util';
import { pipeline } from 'stream';
import path from 'path';

const pump = util.promisify(pipeline);
const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://production-domain.com' : 'http://localhost:3000';

export async function userRoutes(server: FastifyInstance) {
    server.post(
        '/register',
        async (request, reply) => {
            const { firstName, lastName, email, password, phone } = request.body as {
                firstName: string;
                lastName?: string;
                email: string;
                password: string;
                phone: string;
            };
            const user = await User.findOne({ where: { email } });
            if (user) {
                return reply.code(401).send({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            try {
                console.log(hashedPassword);
                const user = await User.create({ firstName, lastName, email, password: hashedPassword, phone });
                reply.code(201).send({ user });
            } catch (error) {
                reply.code(500).send(error);
            }
        });

    server.post('/login',
        async (request, reply) => {

            const { email, password } = request.body as { email: string; password: string };
            const user = await User.findOne({ where: { email } });

            const isMatch = user && (await bcrypt.compare(password, user.password))
            if (!user || !isMatch) {
                return reply.code(401).send({ message: 'Invalid credentials' });
            }

            const payload = {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
            }

            const accessToken = request.jwt.sign(payload)

            reply.setCookie('Authorization', accessToken, {
                path: '/',
                httpOnly: true,
                secure: true,
            })

            const requestToken = request.jwt.sign({ id: user.id }, { expiresIn: '15min'});

            return { requestToken }
        })
    server.get('/profilepicture', {preHandler: [server.authenticate]}, async (request, reply) => {
        const user = await User.findOne({
            where: {
                id: request.user.id
            },
            attributes: ['profilePicture']
        });

        return reply.send({
            profilePicture: `${BASE_URL}/uploads/profilepics/${user.profilePicture}`,
            message: 'Picture retrieved'
        });
    });

    server.post('/validation', { preHandler: [server.authenticate]}, async (request, reply) => {
        console.log(request)
if (!request.cookies.Authorization && !request.headers['authorization']) {
            throw new Error('Unauthorized')
        }
    })
    
    server.post('/upload', { preHandler: [server.authenticate] }, async (request, reply) => {
        const user = request.user;
        const data = await request.file();
        const uploadDir = path.join(process.cwd(), 'uploads', 'profilepics');
        const extension = path.extname(data.filename);
        const filename = `user-${user.id}-${Date.now()}${extension}`;
        const filePath = path.join(uploadDir, filename);

        await fs.mkdir(uploadDir, { recursive: true });

        await pump(data.file, createWriteStream(filePath));
        const [updated] = await User.update(
            { profilePicture: filename},
            { where: { id: user.id}}
        );

        if (updated !== 1) {
            await fs.unlink(filePath);
            throw new Error('Failed to update user profile');
        }
        return { message : 'Picture updated', profilePicture: `/uploads/profilepics/${filename}`};
    })

    server.delete('/logout', { preHandler: [server.authenticate] }, async (request, reply) => {
        reply.clearCookie('access_token')
        return reply.send({ message: 'Logout successful'})
    })

    server.log.info('User routes registered')
}
