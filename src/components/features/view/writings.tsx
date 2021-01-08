import { Text, Stack } from '@chakra-ui/react'
import { useCMS } from '../../../hooks/fetch'
import { Command } from '../../../types'
import { Error, Link } from '../../atoms'
import { CommandWrapper } from '../../command'
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
		console.log(data)
		return (
			<CommandWrapper command={command}>
				{data.articles.map(({ title, description, id }) => (
					<Stack direction="row">
						<Link text={`"${title}"`} href={`/writings/${id}`} />
						<Text isTruncated textOverflow="ellipsis">
							{description}
						</Text>
					</Stack>
				))}
			</CommandWrapper>
		)
	}

	return (
		<CommandWrapper command="view writings" color="warn">
			<Text>Loading writings from CMS...</Text>
		</CommandWrapper>
	)
}
export default Writings
