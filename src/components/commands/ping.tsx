/* eslint-disable no-nested-ternary */
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Spacer,
	Stack,
	Text,
	Heading,
} from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { STATUS_CODES } from 'http'
import { useState } from 'react'

import Head from 'next/head'
import { Command } from '../../types/index'
import { CommandWrapper } from '../command'
import { useEmoji } from '../../hooks/interval'
const f = ['🌑', '🌒', '🌓', '🌔', '🌝', '🌖', '🌗', '🌘']
const Loader = () => {
	const emoji = useEmoji(f, 20)
	return <Text>{emoji} Sending...</Text>
}

export const PingCommand: React.FC<{ command: Command }> = ({ command }) => {
	const [submitState, setSubmitState] = useState('editing')

	function validateName(value) {
		let error
		if (!value) {
			error = 'Name is required'
		}
		return error
	}

	function validateEmail(value) {
		let error
		if (!value) {
			error = 'Email is required'
		}

		if (
			!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				String(value).toLowerCase()
			)
		) {
			error = 'Please submit a valid email address.'
		}

		return error
	}

	function validateMessage(value) {
		let error
		if (!value) {
			error = 'Message is required'
		}
		return error
	}

	return (
		<CommandWrapper
			color={
				// eslint-disable-next-line no-nested-ternary
				submitState === 'editing'
					? 'color'
					: submitState === 'submitting'
					? 'warn'
					: submitState === 'error'
					? 'error'
					: 'success'
			}
			command={command}>
			<Stack gap="5">
				<Heading>Send a message to me!</Heading>

				{submitState === 'editing' ? (
					<Text />
				) : submitState === 'submitting' ? (
					<Loader />
				) : submitState === 'error' ? (
					<Text>❌ Errored out.</Text>
				) : (
					<Text>✅ Sent! (You won't be able to edit this anymore)</Text>
				)}

				<Formik
					initialValues={{
						email: '',
						message: '🚀👁🦕 Hey there!',
						name: `Naval Ravikant, hopefully?`,
					}}
					onSubmit={async (values, actions) => {
						setSubmitState('submitting')
						await fetch('/api/ping', {
							body: JSON.stringify(values),
							method: 'POST', // *GET, POST, PUT, DELETE, etc.
							mode: 'cors', // no-cors, *cors, same-origin
							cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
							credentials: 'same-origin', // include, *same-origin, omit
							headers: {
								'Content-Type': 'application/json',
								// 'Content-Type': 'application/x-www-form-urlencoded',
							},
							redirect: 'follow',
							referrerPolicy: 'no-referrer',
						}).then(({ ok }) => {
							actions.setSubmitting(false)

							if (ok) setSubmitState('submitted')
							else setSubmitState('error')
						})
					}}>
					{(props) => (
						<Form>
							<Stack width="30vw">
								<Stack direction="row">
									<Field name="name" validate={validateName}>
										{({ field, form }) => (
											<FormControl
												isInvalid={form.errors.name && form.touched.name}>
												<FormLabel fontWeight="bold" htmlFor="name">
													First name
												</FormLabel>
												<Input
													_disabled={{
														color: 'grey',
													}}
													isDisabled={submitState === 'submitted'}
													focusBorderColor={
														submitState === 'editing'
															? 'color'
															: submitState === 'submitting'
															? 'accent'
															: submitState === 'error'
															? 'error'
															: 'success'
													}
													borderColor={
														submitState === 'editing'
															? 'color'
															: submitState === 'submitting'
															? 'accent'
															: submitState === 'error'
															? 'error'
															: 'success'
													}
													errorBorderColor="warn"
													variant="flushed"
													{...field}
													id="name"
													placeholder="name"
												/>
												<FormErrorMessage color="warn">
													{form.errors.name}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name="email" validate={validateEmail}>
										{({ field, form }) => (
											<FormControl
												isInvalid={form.errors.email && form.touched.email}>
												<FormLabel fontWeight="bold" htmlFor="email">
													Email
												</FormLabel>
												<Input
													_disabled={{
														color: 'grey',
													}}
													isDisabled={submitState === 'submitted'}
													focusBorderColor={
														submitState === 'editing'
															? 'color'
															: submitState === 'submitting'
															? 'accent'
															: submitState === 'error'
															? 'error'
															: 'success'
													}
													borderColor={
														submitState === 'editing'
															? 'color'
															: submitState === 'submitting'
															? 'accent'
															: submitState === 'error'
															? 'error'
															: 'success'
													}
													errorBorderColor="warn"
													variant="flushed"
													{...field}
													id="email"
													placeholder="email"
												/>
												<FormErrorMessage color="warn">
													{form.errors.email}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
								</Stack>
								<Field name="message" validate={validateMessage}>
									{({ field, form }) => (
										<FormControl
											isInvalid={form.errors.message && form.touched.message}>
											<FormLabel fontWeight="bold" htmlFor="name">
												Message
											</FormLabel>
											<Input
												_disabled={{
													color: 'grey',
												}}
												isDisabled={submitState === 'submitted'}
												focusBorderColor={
													submitState === 'editing'
														? 'color'
														: submitState === 'submitting'
														? 'accent'
														: submitState === 'error'
														? 'error'
														: 'success'
												}
												borderColor={
													submitState === 'editing'
														? 'color'
														: submitState === 'submitting'
														? 'accent'
														: submitState === 'error'
														? 'error'
														: 'success'
												}
												errorBorderColor="warn"
												variant="flushed"
												{...field}
												id="message"
												placeholder="message"
											/>
											<FormErrorMessage color="warn">
												{form.errors.message}
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>
								<Button
									variant="outline"
									mt={4}
									isDisabled={submitState === 'submitted'}
									isLoading={props.isSubmitting}
									type="submit">
									Submit
								</Button>
							</Stack>
						</Form>
					)}
				</Formik>
			</Stack>
		</CommandWrapper>
	)
}
