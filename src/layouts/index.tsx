import { Stack } from '@chakra-ui/react'

export const TerminalLayout: React.FC<any> = ({ children, ...props }) => (
	<Stack
		width={['100vw', '90vw', '80vw', '60vw']}
		marginTop="30%"
		marginBottom="10%"
		spacing="5"
		direction="column"
		{...props}>
		{children}
	</Stack>
)
