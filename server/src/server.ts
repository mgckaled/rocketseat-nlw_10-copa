import FastiFy from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

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

	// Rota -> http://localhost:3333/pools/count
	fastify.get('/pools/count', async () => {
		const count = await prisma.pool.count()

		return { count }
	})

	// raiz do servidor -> http://localhost:3333
	await fastify.listen({ port: 3333 /* host: '0.0.0.0' */ })
}

bootstrap()
