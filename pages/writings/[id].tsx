import request from 'graphql-request'
import {
	Box,
	Heading,
	Text,
	Stack,
	Center,
	Divider,
	Image,
} from '@chakra-ui/react'
import {
	GetStaticPathsContext,
	GetStaticProps,
	GetStaticPropsContext,
} from 'next'
import ReactMarkdown from 'react-markdown'
import { useEffect } from 'react'
import { TerminalLayout } from '../../src/layouts'
import { Commands } from '../../src/components/command'

const WritingsPage = (props) => {
	const { article } = props

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<TerminalLayout width="40vw">
			<Center>
				<Stack borderBottom="1px" paddingBottom="4" spacing="5">
					<Image src={article.background.url} />
					<Box
						paddingX="5"
						paddingY="2"
						borderLeft="1px"
						borderColor="color"
						width="20vw">
						<Text fontSize="0.5rem">Article.</Text>
						<Heading>{article.title}</Heading>
						<Text>{article.description}</Text>
					</Box>
					<ReactMarkdown>{article.content}</ReactMarkdown>
				</Stack>
			</Center>

			<Commands />
		</TerminalLayout>
	)
}

export default WritingsPage

export const getStaticPaths = async () => {
	const { articles } = await request(
		'https://api-us-east-1.graphcms.com/v2/ckjq7p0mau50s01z1aio1b4ia/master',
		`
        {
            articles {
                id
            }
        }
    `
	)

	console.log(articles)

	return {
		paths: articles.map(({ id }) => ({
			params: { id },
		})),
		fallback: true,
	}
}

export const getStaticProps = async (req: GetStaticPropsContext) => {
	const { id } = req.params

	const { article } = await request(
		'https://api-us-east-1.graphcms.com/v2/ckjq7p0mau50s01z1aio1b4ia/master',
		`
        query Query($id:ID!) {
            article(where:{
                id:$id
            }) {
                id
                title
                description
                content
                background {
                    url
                }
            }
        }
    `,
		{
			id,
		}
	)

	return {
		props: {
			article,
		},
	}
}
