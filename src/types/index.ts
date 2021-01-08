export enum CommandType {
	Help,
	View,
	Error,
}

export class Command {
	type: CommandType

	args: Array<string> = []

	raw: string

	constructor(raw: string) {
		const [cmd, ...args] = raw.split(' ')
		this.raw = raw

		switch (cmd) {
			case 'help':
				this.type = CommandType.Help
				break
			case 'view':
				this.type = CommandType.View
				this.args = args
				break
			default:
				this.type = CommandType.Error
		}
	}
}
