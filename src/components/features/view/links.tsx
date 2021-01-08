import React from 'react'
import { Stack, Text } from '@chakra-ui/react'
import { CommandWrapper } from '../../command/index'
import { Error, Link } from '../../atoms'
import { useCMS } from '../../../hooks/fetch'
import { Command } from '../../../types/index'

const Links: React.FC<{ command: Command }> = ({ command }) => {
	const { data, error } = useCMS(`
    {
        routes {
          title
          description
          public
          name
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
				{data.routes
					.filter(({ public: p }) => p)
					.map(({ title, description, name }) => (
						<Stack direction="row">
							<Link text={`${title}: `} href={`https://z.rishi.cx/${name}`} />

							<Text isTruncated textOverflow="ellipsis">
								{description}
							</Text>
						</Stack>
					))}
			</CommandWrapper>
		)
	}

	return (
		<CommandWrapper command={command} color="warn">
			<Text>Loading links from CMS...</Text>
		</CommandWrapper>
	)
}

export default Links
