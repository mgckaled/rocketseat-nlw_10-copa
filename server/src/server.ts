import FastiFy from 'fastify'
import cors from '@fastify/cors'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import ShortUniqueId from 'short-unique-id'

const prisma = new PrismaClient({
	// Log de todas as querys no terminal para debug
	log: ['query']
})

// método assíncrono de criação do servidor
async function bootstrap() {
	const fastify = FastiFy({
		logger: true // logs (debug)
	})

	await fastify.register(cors, {
		origin: 'true' // permite qualquer aplicação acessar o backend
	})

	fastify.get('/pools/count', async () => {
		const count = await prisma.pool.count()

		return { count }
	})

	fastify.get('/users/count', async () => {
		const count = await prisma.user.count()

		return { count }
	})

	fastify.get('/guesses/count', async () => {
		const count = await prisma.guess.count()

		return { count }
	})

	fastify.post('/pools', async (request, reply) => {
		const createPoolBody = z.object({
			title: z.string()
		})

		const { title } = createPoolBody.parse(request.body)

		const generate = new ShortUniqueId({ length: 6 })
		const code = String(generate()).toUpperCase()

		await prisma.pool.create({
			data: {
				title,
				code
			}
		})

		return reply.status(201).send({ code })
	})

	// raiz do servidor -> http://localhost:3333
	await fastify.listen({ port: 3333 /* host: '0.0.0.0' */ })
}

bootstrap()
