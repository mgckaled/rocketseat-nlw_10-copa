import { createContext, ReactNode, useState, useEffect } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { api } from '../services/api'

// garantir o redirecionamento do navegador
WebBrowser.maybeCompleteAuthSession()

interface UserProps {
	name: string
	avatarUrl: string
}

export interface AuthContextDataProps {
	user: UserProps
	isUserLoading: boolean
	sighIn: () => Promise<void>
}

interface AuthProviderProps {
	children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<UserProps>({} as UserProps)

	const [isUserLoading, setIsUserLoading] = useState(false)

	const [request, response, promptAsync] = Google.useAuthRequest({
		clientId:
			'743011881113-012pfmudld9qrigu6kg3kqp6qul0gt8t.apps.googleusercontent.com',
		redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
		scopes: ['profile', 'email']
	})

	async function sighIn() {
		try {
			setIsUserLoading(true)

			// método de ínicio do fluxo de autenticação
			await promptAsync()
		} catch (error) {
			console.log(error)
			throw error
		} finally {
			setIsUserLoading(false)
		}
	}

	async function sighInWithGoogle(access_token: string) {
		// retorna a chave de autenticação que irá buscar os dados do usuário
		// console.log('TOKEN DE AUTENTICAÇÃO => ', access_token)

		try {
			setIsUserLoading(true)
			const tokenResponse = await api.post('/users', { access_token })
			api.defaults.headers.common[
				'Authorization'
			] = `Bearer ${tokenResponse.data.token}`

			const userInfoResponse = await api.get('/me')
			setUser(userInfoResponse.data.user)
		} catch (error) {
			console.log(error)
			throw error
		} finally {
			setIsUserLoading(false)
		}
	}

	useEffect(() => {
		if (response?.type === 'success' && response.authentication?.accessToken) {
			sighInWithGoogle(response.authentication.accessToken)
		}
	}, [response])

	return (
		<AuthContext.Provider
			value={{
				sighIn,
				isUserLoading,
				user
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
