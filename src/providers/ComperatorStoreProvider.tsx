"use client"

import { ComperatorStore, createComperatorStore, initComperatorStore } from "@/stores/comperatorStore"
import { createContext, ReactNode, useContext, useRef } from "react"
import { useStore } from 'zustand'

export type ComperatorStoreApi = ReturnType<typeof createComperatorStore>

export const ComperatorStoreContext = createContext<ComperatorStoreApi | undefined>(undefined)


export const ComperatorStoreProvider = ({ children }: {
    children: ReactNode
}) => {
    const storeRef = useRef<ComperatorStoreApi>(null);
    if (!storeRef.current) {
        storeRef.current = createComperatorStore(initComperatorStore())
    }

    return (
        <ComperatorStoreContext.Provider value={storeRef.current}>
            {children}
        </ComperatorStoreContext.Provider>
    );
}

export const useComperatorStore = <T,>(
    selector: (store: ComperatorStore) => T,
): T => {
    const comperatorStoreContext = useContext(ComperatorStoreContext)

    if (!comperatorStoreContext) {
        throw new Error("useComperatorStore must be used within ComperatorStoreProvider")
    }

    return useStore(comperatorStoreContext, selector);

}
