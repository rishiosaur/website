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

export const getStaticProps = async (req: GetStaticPropsContext) => {
	const { id } = req.params

	console.log(process.env.cms)

	const { article } = await request(
		process.env.cms,
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

	console.log(article)

	return {
		props: {
			article,
		},
	}
}

export const getStaticPaths = async () => {
	const { articles } = await request(
		process.env.cms,
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
