import { Config, World } from '../newTypes'

export type StorageData = {
  year: number
  zoom: number
  xy: [number, number]
  world: World | undefined
  config: Config
}

const defaultStorage: StorageData = {
  year: 0,
  zoom: 4,
  xy: [3700, 1100],
  world: undefined,
  config: { showCultures: false, showMarkers: false },
}

const storageKey = 'test-history-map'

function getStorage() {
  const storageJson = localStorage.getItem(storageKey)
  return storageJson ? (JSON.parse(storageJson) as StorageData) : defaultStorage
}

function setStorage(storage: StorageData) {
  localStorage.setItem(storageKey, JSON.stringify(storage))
}

export function getData(storageKey: keyof StorageData) {
  const storage = getStorage()

  return storage[storageKey]
}

export function setData(data: Partial<StorageData>) {
  const storage = getStorage()

  setStorage({ ...storage, ...data })
}

export function getYear() {
  const storage = getStorage()
  return storage && storage.year
}

export function setYear(year: number) {
  setData({ year })
}

export function getXy() {
  return getStorage().xy
}

export function setXy(xy: [number, number]) {
  setData({ xy })
}

export function resetNavigation() {
  const { zoom, xy } = defaultStorage
  setData({ zoom, xy })
}

export function resetWorld() {
  const { world } = defaultStorage
  setData({ world })
}

export function getWorld() {
  const storage = getStorage()
  return storage && storage.world
}

export function setWorld(world: World) {
  setData({ world })
}

export function getConfig() {
  const storage = getStorage()
  return storage && storage.config
}

export function setConfig(config: Config) {
  setData({ config })
}
