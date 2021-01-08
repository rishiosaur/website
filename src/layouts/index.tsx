import { Flex, Stack } from '@chakra-ui/react'

export const TerminalLayout: React.FC = ({ children }) => (
	<Stack
		spacing="5"
		borderColor="dark"
		paddingTop="2rem"
		direction="column"
		marginX={['0', '0', '0', '50rem']}>
		{children}
	</Stack>
)
