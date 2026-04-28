"use client"

import { createContext, useContext, useRef, type ReactNode } from "react"
import { useStore } from "zustand"
import {
  createSearchStore,
  type SearchStore,
} from "@/stores/search-store"

type SearchStoreApi = ReturnType<typeof createSearchStore>

const SearchStoreContext = createContext<SearchStoreApi | undefined>(undefined)

export function SearchStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<SearchStoreApi | null>(null)

  if (!storeRef.current) {
    storeRef.current = createSearchStore()
  }

  return (
    <SearchStoreContext.Provider value={storeRef.current}>
      {children}
    </SearchStoreContext.Provider>
  )
}

export function useSearchStore<T>(selector: (store: SearchStore) => T): T {
  const searchStoreContext = useContext(SearchStoreContext)

  if (!searchStoreContext) {
    throw new Error("useSearchStore must be used within SearchStoreProvider")
  }

  return useStore(searchStoreContext, selector)
}
