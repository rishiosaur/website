import React from 'react'
import { Stack, Text, Heading } from '@chakra-ui/react'
import { CommandWrapper } from '../../command/index'
import { Error, Link } from '../../atoms'
import { useCMS } from '../../../hooks/fetch'
import { Command } from '../../../types/index'
import { useEmoji } from '../../../hooks/interval'

const f = ['🌑', '🌒', '🌓', '🌔', '🌝', '🌖', '🌗', '🌘']

const Loader: React.FC<{ command: Command }> = ({ command }) => {
	const emoji = useEmoji(f, 50)

	return (
		<CommandWrapper command={command} color="warn">
			<Text>{emoji} Loading links from CMS...</Text>
		</CommandWrapper>
	)
}

const Links: React.FC<{ command: Command }> = ({ command }) => {
	const { data, error } = useCMS(`
    {
        links {
          title
          description
          public
		  
		  url
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
		console.log(data)
		return (
			<CommandWrapper command={command}>
				<Stack>
					<Heading>Links</Heading>
					<Stack direction="row" fontSize="0.75rem">
						<Text size="0.5rem"> - Taken from</Text>
						<Link text="c.rishi.cx" href="https://c.rishi.cx" />
					</Stack>
					{data.links
						.filter(({ public: p }) => p)
						.map(({ title, description, url }) => (
							<Stack direction="row">
								<Link text={`${title}: `} href={url} />

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

export default Links
