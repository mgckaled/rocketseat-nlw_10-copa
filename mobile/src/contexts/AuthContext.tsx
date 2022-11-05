import { createContext, ReactNode } from 'react'

interface UserProps {
	name: string
	avatarUrl: string
}

export interface AuthContextDataProps {
	user: UserProps
	sighIn: () => Promise<void>
}

interface AuthProviderProps {
	children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {
	async function sighIn() {
		console.log('Vamos logar')
	}

	return (
		<AuthContext.Provider
			value={{
				sighIn,
				user: { name: 'Marcel', avatarUrl: 'http://github.com/mgckaled.png' }
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
