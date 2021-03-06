/* eslint-disable no-case-declarations */
import {
	Avatar,
	Box,
	Flex,
	Heading,
	Image,
	Input,
	Stack,
	Text,
} from '@chakra-ui/react'
import { TerminalLayout } from '../src/layouts/index'
import { Commands } from '../src/components/command/index'

export default function Home() {
	return (
		<TerminalLayout>
			<Flex width="100%" direction={['column', 'column', 'column', 'row']}>
				<Box width="20rem">
					<Image src="/pfp.png" />
				</Box>

				<Stack marginLeft={['0', '0', '0', '5']}>
					<Text>👋 Hey there!</Text>
					<Heading>I'm Rishi Kothari.</Heading>
					<Text>
						TL;DR I'm a 15 year old open-source software engineer, Hack Clubber
						SaaS startup CTO, and coffee lover that really likes to make things
						using awesome technologies.
					</Text>
					<Text>
						My website's a spin on the terminal—try running 'help' in the prompt
						to get started!
					</Text>
				</Stack>
			</Flex>

			<Commands />
		</TerminalLayout>
	)
}
