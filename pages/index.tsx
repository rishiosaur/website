import { Box, Flex, Heading, Image, Input, Stack, Text } from '@chakra-ui/react'
import Head from 'next/head'
import { useState } from 'react'
import { TerminalLayout } from '../src/layouts/index'
import { useCommands } from '../src/hooks/command'
import { Command, CommandType } from '../src/types/index'

export default function Home() {
	const { commands, setCommands } = useCommands()

	const [currentCommand, setCurrentCommand] = useState('')

	return (
		<TerminalLayout>
			<Stack direction="row" spacing="2">
				<Box>
					<Image src="https://scrapbook.hackclub.com/attachments/02cbaad88de654cd9508069400e7f4a7/7e8503ea/" />
				</Box>
				<Box>
					<Text>👋 Hey there!</Text>
					<Heading>I'm Rishi Kothari.</Heading>
				</Box>
			</Stack>

			<Stack>
				{commands.map(({ type }) => {
					switch (type) {
						default:
							return (
								<Stack spacing="0" direction="row">
									<Text width="12rem">{'user@macos ->'}</Text>
									<Input
										isReadOnly
										variant="unstyled"
										placeholder="Unstyled"
										onChange={(e) => {
											console.log(e.target.value)
											setCurrentCommand(e.target.value)
										}}
										value={currentCommand}
										onKeyPress={({ key }) => {
											if (key === 'Enter') {
												const command = new Command(currentCommand)
												setCommands(commands.concat(command))
											}
										}}
									/>
								</Stack>
							)
					}
				})}
				<Stack spacing="0" direction="row">
					<Text width="12rem">{'user@macos ->'}</Text>
					<Input
						variant="unstyled"
						placeholder="Unstyled"
						onChange={(e) => {
							console.log(e.target.value)
							setCurrentCommand(e.target.value)
						}}
						value={currentCommand}
						onKeyPress={({ key }) => {
							if (key === 'Enter') {
								const command = new Command(currentCommand)
								setCommands(commands.concat(command))
							}
						}}
					/>
				</Stack>
			</Stack>
		</TerminalLayout>
	)
}
