import React, { useState } from 'react'
import { Stack, Text, Heading, Box, Grid, useTheme } from '@chakra-ui/react'
import { default as NextLink } from 'next/link'
import { CommandWrapper } from '../../command/index'
import { Error, Link } from '../../atoms'
import { useCMS } from '../../../hooks/fetch'
import { Command } from '../../../types/index'
import { useEmoji } from '../../../hooks/interval'

const f = ['🌑', '🌒', '🌓', '🌔', '🌝', '🌖', '🌗', '🌘']
const s = '7rem'

const Loader: React.FC<{ command: Command }> = ({ command }) => {
	const emoji = useEmoji(f, 20)

	return (
		<CommandWrapper command={command} color="warn">
			<Text>{emoji} Loading projects from CMS...</Text>
		</CommandWrapper>
	)
}

const Projects: React.FC<{ command: Command }> = ({ command }) => {
	const { data, error } = useCMS(`
    {
        projects {
            title
            preview
            github
        }
      }
    `)

	const theme = useTheme()

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
				<Stack spacing="3">
					<Heading>Projects</Heading>
					<Stack direction="row" fontSize="0.75rem">
						<Text size="0.5rem"> - Taken from</Text>
						<Link text="c.rishi.cx" href="https://c.rishi.cx" />
					</Stack>
					<Grid
						templateColumns={`repeat(auto-fit, ${s})`}
						templateRows={`repeat(auto-fit, ${s})`}
						width={['100%', '100%', '100%', '50vw']}
						gap={2}>
						{data.projects.map(({ title, preview, github }) => (
							<Box
								fontFamily={theme.fonts.heading}
								padding="2"
								border="1px"
								borderColor="color"
								_hover={{ opacity: 0.2, cursor: 'pointer' }}
								transition="all 0.2s ease-in"
								width="7rem"
								height="7rem"
								backgroundImage={`url(${preview})`}>
								<NextLink href={github}>
									<Text>{title}</Text>
								</NextLink>
							</Box>
						))}
					</Grid>
				</Stack>
			</CommandWrapper>
		)
	}

	return <Loader command={command} />
}

export default Projects
