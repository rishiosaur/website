import { Box, Text, useColorMode, Link as ChakraLink } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { default as NextLink } from 'next/link'
import { mode } from '../util/index'
import { useCommands } from '../hooks/command'

export const Error: React.FC<{ message: string }> = ({ message, children }) => {
	const { colorMode } = useColorMode()
	return (
		<>
			<Text fontFamily="Space Mono, monospace" color="error">
				<Text
					display="inline"
					bgColor="error"
					color={colorMode === 'dark' ? 'dark' : 'light'}>
					ERROR
				</Text>
				{': '}
				{message}
			</Text>
			{children}
		</>
	)
}

export const Link: React.FC<{ text: string; href: string }> = ({
	text,
	href,
}) => {
	const { colorMode } = useColorMode()
	const { setCommands } = useCommands()
	return (
		<ChakraLink
			color={mode('light', 'dark')(colorMode)}
			_hover={{
				backgroundColor: mode('light', 'dark')(colorMode),
				color: mode('dark', 'light')(colorMode),
			}}
			onClick={() => setCommands([])}
			backgroundColor={mode('dark', 'light')(colorMode)}
			textDecoration="none">
			<NextLink href={href}>
				<Text>{text}</Text>
			</NextLink>
		</ChakraLink>
	)
}
