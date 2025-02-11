import { createStore } from 'zustand/vanilla'

export type PageLoadingState = {
    isPageLoading: boolean
}

export type PageLoadingActions = {
    setIsPageLoading: (value: boolean) => void;
}

export type PageLoadingStore = PageLoadingState & PageLoadingActions

export const initPageLoadingStore = (): PageLoadingState => {
    return { isPageLoading: false }
}

export const defaultInitState: PageLoadingState = {
    isPageLoading: false,
}

export const createPageLoadingStore = (
    initState: PageLoadingState = defaultInitState,
) => {
    return createStore<PageLoadingStore>()((set) => ({
        ...initState,
        setIsPageLoading: (value) => set(() => {
            return { isPageLoading: value }
        }),
    }))
}
