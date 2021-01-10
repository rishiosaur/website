import { Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Command } from '../../types/index'
import { CommandWrapper } from '../command/index'
import { Error, Link } from '../atoms'

const links = {
	github: 'https://z.rishi.cx/g',
	instagram: 'https://z.rishi.cx/i',
	twitter: 'https://z.rishi.cx/t',
	links: 'https://z.rishi.cx/ls',
	email: 'mailto:hey@rishi.cx',
	linkedin: 'https://z.rishi.cx/l',
	spotify: 'https://z.rishi.cx/s',
	home: '/',
}

function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}

export const GotoCommand: React.FC<{ command: Command }> = ({ command }) => {
	const [arg] = command.args

	if (arg === 'home') {
		return (
			<CommandWrapper command={command}>
				<Stack direction="row">
					<Text>GOTO home - </Text>
					<Link text="home" href={links[arg]} />
				</Stack>
			</CommandWrapper>
		)
	}

	if (links[arg]) {
		return (
			<CommandWrapper command={command}>
				<Stack direction="row">
					<Text>GOTO {capitalizeFirstLetter(arg)} - </Text>
					<Link text={links[arg]} href={links[arg]} />
				</Stack>
			</CommandWrapper>
		)
	}

	return (
		<CommandWrapper command={command} color="error">
			<Error message={`Invalid arguments passed to command "goto".`} />
		</CommandWrapper>
	)
}
