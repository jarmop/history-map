import { LatLonName, latLonByName } from '../data/coordinates/latLonByName'
import { LatLon } from '../data/data'

export function sum(a: number, b: number) {
  return a + b
}

export function roundFloat(num: number, decimals: number) {
  return parseFloat(num.toFixed(decimals))
}

function isLatLonName(name: string): name is LatLonName {
  return name in latLonByName
}

export function getLatLonByName(name: string): LatLon | undefined {
  return isLatLonName(name) ? (latLonByName[name] as LatLon) : undefined
}
