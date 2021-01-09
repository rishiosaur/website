import React, { useState } from 'react'

export const useInterval = (callback, delay) => {
	const savedCallback = React.useRef()

	React.useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	React.useEffect(() => {
		function tick() {
			;(savedCallback as any).current()
		}

		if (delay !== null) {
			const id = setInterval(tick, delay)
			return () => clearInterval(id)
		}
	}, [delay])
}

export const useEmoji = (f: string[], delay: number) => {
	const [emoji, setEmoji] = useState(f[0])

	useInterval(() => {
		setEmoji(f[Math.floor((Date.now() / 100) % f.length)])
	}, delay)

	return emoji
}
