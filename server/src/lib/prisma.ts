import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
	// Log de todas as querys no terminal para debug
	log: ['query']
})
