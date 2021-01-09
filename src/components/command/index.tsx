/* eslint-disable no-case-declarations */
import {
	Stack,
	Text,
	Box,
	Input,
	Heading,
	Fade,
	Image,
	SlideFade,
} from '@chakra-ui/react'
import { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useCommands } from '../../hooks/command'
import { Command, CommandType } from '../../types/index'
import { Error } from '../atoms'
import { LinksCommand, ProjectsCommand, WritingsCommand } from '../features'
import { GotoCommand } from '../features/goto'

export const CommandWrapper: React.FC<{
	color?: string
	command: Command
}> = ({ children, command, color }) => {
	console.log(command)

	return (
		<SlideFade in>
			<Stack
				paddingLeft="5"
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
		</SlideFade>
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
			{commands?.map((command) => {
				const { raw, type, args } = command
				const [arg] = args
				switch (type) {
					case CommandType.Help:
						return (
							<CommandWrapper command={command}>
								<Stack>
									<Heading>🐚 riSH - the Rishi Shell</Heading>
									<Text>A custom terminal.</Text>
									<Heading size="md">Commands</Heading>
									<Stack>
										<Stack direction="row">
											<Text fontWeight="bold">
												view {'<writings|links|projects>'}
											</Text>

											<Text>
												- Returns some form of remote property off of the CMS.
											</Text>
										</Stack>
										<Stack direction="row">
											<Text fontWeight="bold">whoami</Text>

											<Text>
												- Interested in understand who I am? I'm flattered!
												Returns a little blurb about me.
											</Text>
										</Stack>

										<Stack direction="row">
											<Text fontWeight="bold">help</Text>

											<Text>
												- Returns a tiny blurb about what to do with this
												website.
											</Text>
										</Stack>
										<Stack direction="row">
											<Text fontWeight="bold">clear</Text>

											<Text>- Clears this terminal of all commands.</Text>
										</Stack>
										<Stack direction="row">
											<Text fontWeight="bold">
												goto {'<github|twitter|instagram|email|links>'}
											</Text>

											<Text>- Posts a redirect link to a given website.</Text>
										</Stack>
										<Stack direction="row">
											<Text fontWeight="bold">back</Text>

											<Text>- Goes back in history.</Text>
										</Stack>
									</Stack>
								</Stack>
							</CommandWrapper>
						)

					case CommandType.Back:
						router.back()
						return

					case CommandType.Clear:
						setCommands([])
						return

					case CommandType.View:
						console.log(command)
						switch (arg) {
							case 'writings':
								console.log(command)
								return <WritingsCommand command={command} />

							case 'links':
								console.log(command)
								return <LinksCommand command={command} />

							case 'projects':
								return <ProjectsCommand command={command} />

							default:
								return (
									<CommandWrapper command={command} color="error">
										<Error
											message={`Invalid arguments passed to command "view." Usage: "view <writings|links>"`}
										/>
									</CommandWrapper>
								)
						}

						break

					case CommandType.Goto:
						return <GotoCommand command={command} />

						break

					case CommandType.Whoami:
						return (
							<CommandWrapper command={command} color="accent">
								<Stack spacing="5">
									<Image
										borderRadius="md"
										height="20rem"
										fit="cover"
										width="100%"
										src="/life.png"
									/>
									<Heading>Who the heck are you?</Heading>
									<Text>I'm Rishi!</Text>
								</Stack>
							</CommandWrapper>
						)

					default:
						console.log(command)
						return (
							<CommandWrapper command={command} color="error">
								<Error
									message={`${raw} is not recorgnized (not a typo) as a command. Run "help" to see what you can do.`}
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
				spacing="3"
				direction="row">
				<Text width="2.2rem">{`${prompt}>`}</Text>
				<Input
					variant="unstyled"
					onChange={(e) => {
						setCurrentCommand(e.target.value.trimLeft())
						const cmd = new Command(e.target.value.trimLeft().toLowerCase())
						if (e.target.value === '') {
							setPrompt(defaultPrompt)
						} else {
							setPrompt(cmd.type)
						}
					}}
					value={`${currentCommand}`}
					onKeyPress={({ key }) => {
						if (key === 'Enter') {
							const command = new Command(currentCommand.toLowerCase())

							setCommands(commands.concat(command))
							setCurrentCommand('')
						}
					}}
				/>
			</Stack>
		</Box>
	)
}
