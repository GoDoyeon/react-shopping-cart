export const getStorage = (key: string) => {
	const item = localStorage.getItem(key)
	console.log(item)
	return item ? JSON.parse(item) : null
}

export const setStorage = (key: string, value: any): void => {
	localStorage.setItem(key, JSON.stringify(value))
}

export const removeStorage = (key: string): void => {
	localStorage.removeItem(key)
}

export const clearStorage = (): void => {
	localStorage.clear()
}
