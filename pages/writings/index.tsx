import { Heading, Stack, Text, Box, Image } from '@chakra-ui/react'
import request from 'graphql-request'
import { TerminalLayout } from '../../src/layouts'
import { Link } from '../../src/components/atoms'
import { Commands } from '../../src/components/command'

const WritingsPage = ({ articles }) => (
	<TerminalLayout>
		<Stack spacing="5">
			<Stack spacing="5">
				<Image
					src="https://media.graphcms.com/B26koG61TGyASUoGVvVz"
					height="20rem"
					fit="cover"
				/>
				<Box
					paddingX="5"
					paddingY="2"
					borderLeft="1px"
					borderColor="color"
					width={['inherit', 'inherit', 'inherit', '20vw']}>
					<Heading>Writings</Heading>
					<Text>
						The complete list of my thoughts, ideas, poems (sometimes), and just
						mind wobble in general.
					</Text>
				</Box>
			</Stack>
			<Stack borderBottom="1px" paddingBottom="4" spacing="5">
				{articles.map(({ title, description, id }) => (
					<Stack
						align="center"
						direction={['column', 'column', 'column', 'row']}>
						<Link text={`"${title}"`} href={`/writings/${id}`} />
						<Text textOverflow="ellipsis">{description}</Text>
					</Stack>
				))}
			</Stack>
			<Commands />
		</Stack>
	</TerminalLayout>
)

export default WritingsPage

export const getStaticProps = async () => {
	const { articles } = await request(
		process.env.cms,
		`
        {articles(orderBy:createdAt_DESC) {
            id
            title
            description
            createdAt
        }}
    `
	)

	return {
		props: {
			articles,
		},
	}
}
