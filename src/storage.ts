type Storage = {
  yearIndex: number
  zoom: number
  xy: number[]
}

const defaultStorage = { yearIndex: 0, zoom: 1, xy: [0, 0] }

const storageKey = 'history-map'

function getStorage() {
  const storageJson = localStorage.getItem(storageKey)
  return storageJson ? (JSON.parse(storageJson) as Storage) : defaultStorage
}

function setStorage(storage: Storage) {
  localStorage.setItem(storageKey, JSON.stringify(storage))
}

export function getYearIndex() {
  const storage = getStorage()
  return storage && storage.yearIndex
}

export function setYearIndex(yearIndex: number) {
  setData({ yearIndex })
}

export function getZoom() {
  const storage = getStorage()
  return storage && storage.zoom
}

export function setZoom(zoom: number) {
  setData({ zoom })
}

export function getXy() {
  return getStorage().xy
}

export function setData(data: Partial<Storage>) {
  const storage = getStorage()

  setStorage({ ...storage, ...data })
}
