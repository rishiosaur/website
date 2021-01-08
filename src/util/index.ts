export const mode = (lightMode: string, darkMode: string) => (
	m: 'dark' | 'light'
) => (m === 'dark' ? darkMode : lightMode)
