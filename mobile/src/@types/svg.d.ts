//*  edita a tipagem de um arquivo svg e possibilita seu uso direto como um componente, inclusive a manipulação de suas propriedades //

declare module '*.svg' {
	import React from 'react'
	import { SvgProps } from 'react-native-svg'
	const content: React.FC<SvgProps>
	export default content
}
