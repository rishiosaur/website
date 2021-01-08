import React, { useContext, useState } from 'react'
import { Command } from '../types'

const CommandContext = React.createContext<{
	commands: Array<Command>
	setCommands: React.Dispatch<React.SetStateAction<Command[]>>
}>({} as any)

export const CommandProvider: React.FC = ({ children }) => {
	const [commands, setCommands] = useState<Array<Command>>([])

	return (
		<CommandContext.Provider value={{ commands, setCommands }}>
			{children}
		</CommandContext.Provider>
	)
}

export const useCommands = () => useContext(CommandContext)
