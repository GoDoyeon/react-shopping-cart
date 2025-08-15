import { create } from 'zustand'
import { getStorage, setStorage } from '../utils/storage'
import type { BookmarkStore } from '../types/bookmark'

const useBookmarkStore = create<BookmarkStore>((set) => ({
	bookmarkList: getStorage('bookmarks') || [],

	getBookmarkList: () => {
		const bookmarks = getStorage('bookmarks') || []
		set({ bookmarkList: bookmarks })
	},

	toggleBookmark: (id: number) => {
		set((state) => {
			const isBookmarked = state.bookmarkList.includes(id)
			let newBookmarkList: number[]

			if (isBookmarked) {
				newBookmarkList = state.bookmarkList.filter(
					(bookmark) => bookmark !== id
				)
			} else {
				newBookmarkList = [...state.bookmarkList, id]
			}

			setStorage('bookmarks', newBookmarkList)

			return { bookmarkList: newBookmarkList }
		})
	},
}))

export default useBookmarkStore
