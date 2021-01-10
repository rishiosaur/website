import { Stack } from '@chakra-ui/react'

export const TerminalLayout: React.FC<any> = ({ children, ...props }) => (
	<Stack
		width={['inherit', 'inherit', '80vw', '50vw']}
		marginTop="30%"
		marginBottom="10%"
		spacing="5"
		direction="column"
		marginX={['5', '5', '5', '0']}
		{...props}>
		{children}
	</Stack>
)
