"use client"
import { createPageLoadingStore, initPageLoadingStore, PageLoadingStore } from "@/stores/loadingStore"
import { createContext, ReactNode, useContext, useRef } from "react"
import { useStore } from 'zustand'

export type PageLoadingStoreApi = ReturnType<typeof createPageLoadingStore>

export const PageLoadingStoreContext = createContext<PageLoadingStoreApi | undefined>(undefined)


export const PageLoadingStoreProvider = ({ children }: {
    children: ReactNode
}) => {
    const storeRef = useRef<PageLoadingStoreApi>(null);
    if (!storeRef.current) {
        storeRef.current = createPageLoadingStore(initPageLoadingStore())
    }

    return (
        <PageLoadingStoreContext.Provider value={storeRef.current}>
            {children}
        </PageLoadingStoreContext.Provider>
    );
}

export const usePageLoadingStore = <T,>(
    selector: (store: PageLoadingStore) => T,
): T => {
    const loadingStoreContext = useContext(PageLoadingStoreContext)

    if (!loadingStoreContext) {
        throw new Error("useComperatorStore must be used within ComperatorStoreProvider")
    }

    return useStore(loadingStoreContext, selector);

}
