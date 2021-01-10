export const mode = (lightMode: string, darkMode: string) => (
	m: 'dark' | 'light'
) => (m === 'dark' ? darkMode : lightMode)

export const sample = <T>(list: T[]) =>
	list[Math.floor(Math.random() * list.length)]
