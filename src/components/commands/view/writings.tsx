import { Text, Stack, Heading, Fade, Spacer } from '@chakra-ui/react'
import { useCMS } from '../../../hooks/fetch'
import { Command } from '../../../types'
import { Error, Link } from '../../atoms'
import { CommandWrapper } from '../../command'
import { useEmoji } from '../../../hooks/interval'
import { sample } from '../../../util/index'

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

export const WritingsList: React.FC<{ articles: any[] } & any> = ({
	articles,
	...props
}) => (
	<Stack spacing="8">
		{articles.map(({ title, description, id, createdAt }, index) => (
			<Stack style={{ opacity: 1 / (index + 0.4) }} flexWrap="wrap" {...props}>
				<Stack direction="row" align="center">
					<Text>
						{`${sample(['🛠', '✍️', '🖊', '🖋', '📝'])} ${new Date(
							createdAt
						).toLocaleDateString()}:`}
					</Text>
					<Link text={`"${title}"`} href={`/writings/${id}`} />
				</Stack>
				<Text isTruncated maxWidth="30rem" textOverflow="ellipsis">
					{description}
				</Text>
			</Stack>
		))}
	</Stack>
)

const Writings: React.FC<{ command: Command }> = ({ command }) => {
	const { data, error } = useCMS(`
        {
            articles(orderBy:createdAt_DESC,first:5) {
                id
                title
				description
				createdAt
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
					<Stack align="center" direction="row" fontSize="0.75rem">
						<Text size="0.5rem"> - Taken from</Text>
						<Link text="c.rishi.cx" href="https://c.rishi.cx" />
					</Stack>
					<Spacer />
					<WritingsList articles={data.articles} />
					<Spacer />
					<Stack align="center" direction="row" fontSize="0.75rem">
						<Text size="0.5rem">Full list at</Text>
						<Link text="/writings" href="/writings" />
					</Stack>
				</Stack>
			</CommandWrapper>
		)
	}

	return <Loader command={command} />
}
export default Writings
