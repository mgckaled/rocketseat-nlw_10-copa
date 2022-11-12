import { useState, useEffect } from 'react'
import { FlatList, useToast } from 'native-base'

import { api } from '../services/api'

import { Game, GameProps } from './Game'
import { Loading } from './Loading'

interface Props {
	poolId: string
}

export function Guesses({ poolId }: Props) {
	const [isLoading, setIsLoading] = useState(true)
	const [games, setGames] = useState<GameProps[]>([])
	const [fisrtTeamPoints, setFisrTeamPoints] = useState('')
	const [secondTeamPoints, setSecondTeamPoints] = useState('')

	const toast = useToast()

	async function fetchGames() {
		try {
			setIsLoading(true)

			const response = await api.get(`/pools/${poolId}/games`)
			console.log(response.data.games)
			setGames(response.data.games)
		} catch (error) {
			console.log(error)

			toast.show({
				title: 'Não foi possivel carregar os jogos',
				placement: 'top',
				bgColor: 'red.500'
			})
		} finally {
			setIsLoading(false)
		}
	}

	async function handleGuessConfirm(gameId: string) {
		try {
			if (!fisrtTeamPoints.trim() || !secondTeamPoints.trim()) {
				return toast.show({
					title: 'Informe o placar do palpite',
					placement: 'top',
					bgColor: 'red.500'
				})
			}

			await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
				fisrtTeamPoints: Number(fisrtTeamPoints),
				secondTeamPoints: Number(secondTeamPoints)
			})

			toast.show({
				title: 'Palpite foi realizado com sucesso',
				placement: 'top',
				bgColor: 'green.500'
			})

			fetchGames()
		} catch (error) {
			console.log(error)

			toast.show({
				title: 'Não foi possivel enviar o palpite',
				placement: 'top',
				bgColor: 'red.500'
			})
		}
	}

	useEffect(() => {
		fetchGames()
	}, [poolId])

	if (isLoading) {
		return <Loading />
	}

	return (
		<FlatList
			data={games}
			keyExtractor={item => item.id}
			renderItem={({ item }) => (
				<Game
					data={item}
					setFisrtTeamPoints={setFisrTeamPoints}
					setSecondTeamPoints={setSecondTeamPoints}
					onGuessConfirm={() => handleGuessConfirm(item.id)}
				/>
			)}
			_contentContainerStyle={{ pb: 10 }}
		/>
	)
}
