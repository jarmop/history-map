import { World } from './testbed/newTypes'
import { Config } from './types'

type Storage = {
  year: number
  zoom: number
  xy: number[]
  config: Config
  world: World
}

const defaultStorage: Storage = {
  year: 0,
  zoom: 1,
  xy: [0, 0],
  config: { zoomEnabled: true, showParallelsAndMeridians: false },
  world: {
    borders: [],
    regions: [],
    rivers: [],
    seas: [],
    cities: [],
    markers: [],
    cultures: [],
  },
}

const storageKey = 'history-map'

function getStorage() {
  const storageJson = localStorage.getItem(storageKey)
  return storageJson ? (JSON.parse(storageJson) as Storage) : defaultStorage
}

function setStorage(storage: Storage) {
  localStorage.setItem(storageKey, JSON.stringify(storage))
}

export function getYear() {
  const storage = getStorage()
  return storage && storage.year
}

export function setYear(year: number) {
  setData({ year })
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

export function getConfig() {
  const storage = getStorage()
  return storage && storage.config
}

export function setConfig(config: Config) {
  setData({ config })
}

export function resetAll() {
  setStorage(defaultStorage)
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
