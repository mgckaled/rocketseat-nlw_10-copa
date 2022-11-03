import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	const user = await prisma.user.create({
		data: {
			name: 'John Doe',
			email: 'john.doe@gmail.com',
			avatarUrl: 'http://github.com/mgckaled.png'
		}
	})

	const pool = await prisma.pool.create({
		data: {
			title: 'Example Pool',
			code: 'BOL123',
			ownerId: user.id,

			participants: {
				create: {
					userId: user.id
				}
			}
		}
	})

	await prisma.game.create({
		data: {
			date: '2022-11-02T22:59:49.559Z',
			fisrtTeamCountryCode: 'DE',
			secondTeamCountryCode: 'BR'
		}
	})

	await prisma.game.create({
		data: {
			date: '2022-11-02T23:05:44.411Z',
			fisrtTeamCountryCode: 'BR',
			secondTeamCountryCode: 'AR',

			guesses: {
				create: {
					fisrtTeamPoints: 2,
					secondTeamPoints: 1,

					participant: {
						connect: {
							userId_poolId: {
								userId: user.id,
								poolId: pool.id
							}
						}
					}
				}
			}
		}
	})
}

main()
