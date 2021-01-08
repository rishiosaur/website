import { Flex, Stack } from '@chakra-ui/react'

export const TerminalLayout: React.FC = ({ children }) => (
	<Stack marginY="5rem" width="80vh" spacing="5" direction="column">
		{children}
	</Stack>
)
