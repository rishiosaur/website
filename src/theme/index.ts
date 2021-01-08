import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const colors = {
	light: '#e0e1dd',
	dark: '#0d1b2a',
	accent: '#778da9',
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
	useSystemColorMode: true,
}

const theme = { ...extendTheme({ colors, config }), styles }
export default theme
