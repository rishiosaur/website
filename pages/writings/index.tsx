import { Heading, Stack, Text, Box, Image, Divider } from '@chakra-ui/react'
import request from 'graphql-request'
import { TerminalLayout } from '../../src/layouts'
import { Link } from '../../src/components/atoms'
import { Commands } from '../../src/components/command'
import { sample } from '../../src/util'
import { WritingsList } from '../../src/components/commands/view/writings'

const WritingsPage = ({ articles }) => (
	<TerminalLayout>
		{/* <Stack spacing="5"> */}
		<Stack spacing="5">
			<Image
				src="https://images.unsplash.com/photo-1517685633466-403d6955aeab?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80"
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
			<WritingsList articles={articles} style={{ opacity: '1' }} />
		</Stack>

		<Commands />
		{/* </Stack> */}
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
