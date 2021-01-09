import { Center, ChakraProvider, SlideFade } from '@chakra-ui/react'
import { CommandProvider } from '../src/hooks/command'
import theme from '../src/theme/index'

const App = ({ Component, pageProps }) => (
	<>
		<CommandProvider>
			<ChakraProvider theme={theme}>
				<Center>
					<SlideFade in>
						<Component {...pageProps} />
					</SlideFade>
				</Center>
			</ChakraProvider>
		</CommandProvider>
		<style jsx global>
			{`
				@font-face {
					font-family: 'JetBrains Mono';
					src: url('https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/webfonts/JetBrainsMono-Regular.woff2')
							format('woff2'),
						url('https://raw.githubusercontent.com/JetBrains/JetBrainsMono/master/fonts/ttf/JetBrainsMono-Regular.ttf')
							format('truetype');
					font-weight: normal;
					font-style: normal;
				}

				body {
					-webkit-font-feature-settings: 'liga' on, 'calt' on;
					-webkit-font-smoothing: antialiased;
					text-rendering: optimizeLegibility;
					font-family: 'JetBrains Mono', monospace;
				}
			`}
		</style>
	</>
)

export default App
