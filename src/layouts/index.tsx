import { Flex, Stack } from '@chakra-ui/react'

export const TerminalLayout: React.FC = ({ children }) => (
	<Stack
		marginY="5rem"
		width={['100vw', '90vw', '80vw', '60vw']}
		spacing="5"
		direction="column">
		{children}
	</Stack>
)
