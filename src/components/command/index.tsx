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
import { Error, Link } from '../atoms'

import { GotoCommand } from '../commands/goto'
import { PingCommand } from '../commands/ping'
import {
	LinksCommand,
	ProjectsCommand,
	WritingsCommand,
} from '../commands/view'

export const CommandWrapper: React.FC<
	{
		color?: string
		command: Command
	} & any
> = ({ children, command, color, ...props }) => (
	<SlideFade in>
		<Stack
			paddingLeft="5"
			paddingY="1"
			marginY="5"
			borderLeft="2px"
			color={color || 'color'}
			spacing="0"
			direction="column"
			{...props}>
			<Text fontFamily="Space Mono, monospace">
				{`${command.type}>`} {command.raw}
			</Text>

			<br />
			{children}
		</Stack>
	</SlideFade>
)

const defaultPrompt = '✨'

export const Commands: React.FC<{ scroll?: boolean }> = ({ scroll }) => {
	const { commands, setCommands } = useCommands()

	const [currentCommand, setCurrentCommand] = useState('')

	const [prompt, setPrompt] = useState(defaultPrompt)

	const router = useRouter()
	const bottomRef = useRef(null)
	const scrollToBottom = () => {
		if (bottomRef && bottomRef.current)
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
										<Stack direction={['column', 'column', 'column', 'row']}>
											<Text fontWeight="bold">
												view {'<writings|links|projects>'}
											</Text>

											<Text>
												- Returns some form of remote property off of the CMS.
											</Text>
										</Stack>
										<Stack direction={['column', 'column', 'column', 'row']}>
											<Text fontWeight="bold">whoami</Text>

											<Text>- Returns a little blurb about me.</Text>
										</Stack>

										<Stack direction={['column', 'column', 'column', 'row']}>
											<Text fontWeight="bold">help</Text>

											<Text>
												- Returns a tiny blurb about what to do with this
												website.
											</Text>
										</Stack>
										<Stack direction={['column', 'column', 'column', 'row']}>
											<Text fontWeight="bold">clear</Text>

											<Text>- Clears this terminal of all commands.</Text>
										</Stack>
										<Stack direction={['column', 'column', 'column', 'row']}>
											<Text fontWeight="bold">
												goto {'<github|twitter|instagram|email|links|home>'}
											</Text>

											<Text>- Posts a link to a certain website.</Text>
										</Stack>
										<Stack direction={['column', 'column', 'column', 'row']}>
											<Text fontWeight="bold">back</Text>

											<Text>- Goes back in history.</Text>
										</Stack>
										<Stack direction={['column', 'column', 'column', 'row']}>
											<Text fontWeight="bold">ping</Text>

											<Text>- Want to send a message to me?</Text>
										</Stack>
									</Stack>
								</Stack>
							</CommandWrapper>
						)

					case CommandType.Back:
						router.back()
						return

					case CommandType.Ping:
						return <PingCommand command={command} />

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

							case 'source':
								router.push('https://z.rishi.cx/g/website')
								return (
									<CommandWrapper command={command}>
										<Text>Redirecting to rishiosaur/website...</Text>
									</CommandWrapper>
								)

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
							<CommandWrapper
								command={command}
								color="accent"
								borderLeft="0"
								paddingTop="5"
								borderTop="2px"
								paddingX="0">
								<Stack spacing="5">
									<Image
										borderRadius="md"
										height="20rem"
										fit="cover"
										width="100%"
										src="/life.png"
									/>
									<Heading>Who the heck are you?</Heading>
									<Text fontWeight="bold">A 15 year old's manifesto.</Text>
									<Text>
										{' '}
										Programming isn't something that I do for money. It is
										because it's my passion. Programming, in our world, is a
										convoluted thing, filled with libraries, frameworks, and all
										sorts of keyboard trickery. However, at the end of it, there
										lies a masterful product: one that may change the world,
										even. That is exactly what appeals to me. The ability to
										make something revolutionary through something that is
										incredibly accessible is the greatest thing one can do.
									</Text>
									<Text>
										Ideas don't come free. They require hard work, with setbacks
										all along the way. My job isn't necessarily to create ideas;
										it can also be to help realize dreams. My job is to bear all
										the grunt work that is required to put an idea into reality,
										be it large or small.{' '}
									</Text>

									<Text width="20vw" p="5" border="1px">
										I'm Rishi Kothari, and I am a programmer. I create efficient
										products out of little more than dreams, and more than
										anything else, I <em>love</em> doing it.
									</Text>
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
				direction="row"
				fontFamily="Space Mono, monospace">
				<Text width="2.2rem">{`${prompt}>`}</Text>
				<Input
					variant="unstyled"
					placeholder="Type 'help' to get started."
					_placeholder={{
						color: 'accent',
						opacity: '0.5',
					}}
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
