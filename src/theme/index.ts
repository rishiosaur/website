import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const colors = {
	light: '#ffffff',
	dark: '#000000',
	error: '#ee4266',
	accent: '#07a0c3',
	success: '#2ec4b6',
	warn: '#e3b23c',
}

const fonts = {
	body: {
		fontFamily: 'JetBrains Mono, monospace',
	},
	heading: {
		fontFamily: 'Inter, -system-ui',
	},
}

const styles = {
	global: (props: any) => ({
		body: {
			color: mode('dark', 'light')(props),
			bg: mode('light', 'dark')(props),
		},
		lineHeight: 'base',
		'*::placeholder': {
			color: mode('dark', 'light')(props),
		},
		'*, *::before, &::after': {
			borderColor: mode('dark', 'light')(props),
			wordWrap: 'break-word',
		},
		fontFeatureSettings: `"pnum"`,
		fontVariantNumeric: 'proportional-nums',
		fontVariantLigatures: 'normal',
	}),
}

const config = {
	useSystemColorMode: false,
	initialColorMode: 'dark',
}

const theme = { ...extendTheme({ colors, config }), styles }
export default theme
