export interface BookmarkState {
	bookmarkList: number[]
}

export interface BookmarkActions {
	getBookmarkList: () => void
	toggleBookmark: (id: number) => void
}

export type BookmarkStore = BookmarkState & BookmarkActions
