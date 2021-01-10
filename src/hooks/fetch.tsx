import { request } from 'graphql-request'
import { RequestDocument } from 'graphql-request/dist/types'
import useSWR from 'swr'

export const cmsFetcher = (query: RequestDocument) =>
	request(process.env.cms, query)

export const useCMS = (query: string) => useSWR(query, cmsFetcher)
