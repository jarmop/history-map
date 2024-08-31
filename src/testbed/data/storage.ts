export type StorageData = {
  year: number
  zoom: number
  xy: [number, number]
}

const defaultStorage: StorageData = {
  year: 0,
  zoom: 4,
  xy: [3700, 1100],
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
