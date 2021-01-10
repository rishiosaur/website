import { Text, Stack, Heading, Fade } from '@chakra-ui/react'
import { useCMS } from '../../../hooks/fetch'
import { Command } from '../../../types'
import { Error, Link } from '../../atoms'
import { CommandWrapper } from '../../command'
import { useEmoji } from '../../../hooks/interval'

const Loader: React.FC<{ command: Command }> = ({ command }) => {
	const emoji = useEmoji(
		['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛'],
		50
	)

	return (
		<CommandWrapper command={command} color="warn">
			<Text>{emoji} Loading links from CMS...</Text>
		</CommandWrapper>
	)
}

const Writings: React.FC<{ command: Command }> = ({ command }) => {
	const { data, error } = useCMS(`
        {
            articles {
                id
                title
                description
            }
        }
    `)

	if (error) {
		return (
			<CommandWrapper command={command} color="error">
				<Error message="Ran into an unexpected error on load." />
			</CommandWrapper>
		)
	}

	if (data) {
		return (
			<CommandWrapper command={command}>
				<Stack>
					<Heading>Writings</Heading>
					<Stack direction="row" fontSize="0.75rem">
						<Text size="0.5rem"> - Taken from</Text>
						<Link text="c.rishi.cx" href="https://c.rishi.cx" />
					</Stack>
					{data.articles.map(({ title, description, id }) => (
						<Stack direction="row">
							<Link text={`"${title}"`} href={`/writings/${id}`} />
							<Text isTruncated textOverflow="ellipsis">
								{description}
							</Text>
						</Stack>
					))}
				</Stack>
			</CommandWrapper>
		)
	}

	return <Loader command={command} />
}
export default Writings
