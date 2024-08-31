import { useEffect, useState } from 'react'
import { getData, setData, StorageData } from './storage'

function usePersistedState<T>(storageKey: keyof StorageData) {
  const [value, setValue] = useState<T>(getData(storageKey) as T)

  useEffect(() => {
    setData({ [storageKey]: value })
  }, [value, storageKey])

  return [value, setValue] as const
}

export function useYear() {
  return usePersistedState<number>('year')
}

export function useZoom() {
  return usePersistedState<number>('zoom')
}

export function useXy() {
  return usePersistedState<[number, number]>('xy')
}
