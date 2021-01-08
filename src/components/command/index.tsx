/* eslint-disable no-case-declarations */
import { Stack, Text, Box, Input } from '@chakra-ui/react'
import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCommands } from '../../hooks/command'
import { Command, CommandType } from '../../types/index'
import { Error } from '../atoms'
import { LinksCommand, WritingsCommand } from '../features'

export const CommandWrapper: React.FC<{
	color?: string
	command: Command
}> = ({ children, command, color }) => {
	console.log(command)

	return (
		<Stack
			paddingLeft="2"
			paddingY="1"
			marginY="5"
			borderLeft="2px"
			color={color || 'color'}
			spacing="0"
			direction="column">
			<Text>
				{`${command.type}>`} {command.raw}
			</Text>

			<br />
			{children}
		</Stack>
	)
}

const defaultPrompt = '✨'

export const Commands: React.FC = () => {
	const { commands, setCommands } = useCommands()

	const [currentCommand, setCurrentCommand] = useState('')

	const [prompt, setPrompt] = useState(defaultPrompt)

	const router = useRouter()

	const bottomRef = useRef(null)
	const scrollToBottom = () => {
		if (bottomRef)
			bottomRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
	}

	useEffect(() => {
		if (currentCommand === '') {
			setPrompt(defaultPrompt)
		}
	}, [currentCommand])

	useEffect(() => {
		scrollToBottom()
	}, [commands])

	useEffect(() => {
		scrollToBottom()
	}, [])
	return (
		<Box
			className="root"
			height="80%"
			overflow="auto"
			textOverflow="ellipsis"
			overflowWrap="revert"
			spacing="5"
			direction="column">
			{commands.map((command) => {
				const { raw, type, args } = command

				switch (type) {
					case CommandType.Help:
						return (
							<CommandWrapper command={command}>
								<Text>Hi</Text>
							</CommandWrapper>
						)

					case CommandType.Back:
						router.back()
						return

					case CommandType.Clear:
						setCommands([])
						return

					case CommandType.View:
						const [arg] = args
						console.log(command)
						switch (arg) {
							case 'writings':
								console.log(command)
								return <WritingsCommand command={command} />

							case 'links':
								console.log(command)
								return <LinksCommand command={command} />

							default:
								return (
									<CommandWrapper command={command} color="error">
										<Error
											message={`Invalid arguments passed to command "view." Usage: "view <writings|links|about>"`}
										/>
									</CommandWrapper>
								)
						}

						break

					default:
						console.log(command)
						return (
							<CommandWrapper command={command} color="error">
								<Error
									message={`${raw} is not recorgnized (not a typo) as a command. Run "help" to find out more.`}
								/>
							</CommandWrapper>
						)
						break
				}
			})}
			<Stack
				ref={bottomRef}
				padding="5"
				border="1px"
				borderColor={prompt === CommandType.Error ? 'error' : 'accent'}
				color={prompt === CommandType.Error ? 'error' : 'accent'}
				spacing="0"
				direction="row">
				<Text width="2.2em">{`${prompt}> `}</Text>
				<Input
					variant="unstyled"
					onChange={(e) => {
						console.log(e.target.value)
						setCurrentCommand(e.target.value.trimLeft())
						const cmd = new Command(e.target.value.trimLeft())
						if (e.target.value === '') {
							setPrompt(defaultPrompt)
						} else {
							setPrompt(cmd.type)
						}
					}}
					value={`${currentCommand}`}
					onKeyPress={({ key }) => {
						if (key === 'Enter') {
							const command = new Command(currentCommand)

							setCommands(commands.concat(command))
							setCurrentCommand('')
						}
					}}
				/>
			</Stack>
		</Box>
	)
}
