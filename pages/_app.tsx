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
				@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
				@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

				body {
					-webkit-font-feature-settings: 'liga' on, 'calt' on;
					-webkit-font-smoothing: antialiased;
					text-rendering: optimizeLegibility;
					 {
						/* font-family: 'Space Mono', monospace; */
					}
				}
			`}
		</style>
	</>
)

export default App
