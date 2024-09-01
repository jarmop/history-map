import { useEffect, useState } from 'react'
import { getData, setData, StorageData } from './storage'
import { Config, World } from '../newTypes'

function usePersistedState<T>(storageKey: keyof StorageData, defaultValue?: T) {
  const persistedValue = getData(storageKey) as T
  const initialValue = persistedValue ?? defaultValue
  const [value, setValue] = useState<T>(initialValue as T)
  // const [value, setValue] = useState<T>(getData(storageKey) as T)

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

export function useConfig() {
  return usePersistedState<Config>('config')
}

export function useWorld(defaultValue: World) {
  return usePersistedState<World>('world', defaultValue)
}
