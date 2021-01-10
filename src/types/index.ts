export enum CommandType {
	Help = '🛠',
	View = '👁',
	Error = '‼️',
	Back = '⏮',
	Whoami = '👋',
	Goto = '🚀',
	Clear = '🔃',
	Ping = '🗣',
}

export class Command {
	type: CommandType

	args: Array<string> = []

	raw: string

	constructor(raw: string) {
		const [cmd, ...args] = raw.split(' ')
		this.raw = raw

		this.args = args

		switch (cmd) {
			case 'help':
				this.type = CommandType.Help
				break
			case 'view':
				this.type = CommandType.View
				break
			case 'back':
				this.type = CommandType.Back
				break
			case 'clear':
				this.type = CommandType.Clear
				break
			case 'about':
			case 'whoami':
				this.type = CommandType.Whoami
				break
			case 'goto':
				this.type = CommandType.Goto
				break
			case 'ping':
				this.type = CommandType.Ping
				break
			default:
				this.type = CommandType.Error
		}
	}
}
