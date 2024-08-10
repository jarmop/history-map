import { LatLonName } from './coordinates/latLonByName'

export type State = { borders: string[][]; cities: LatLonName[] }

export type StateByYear = Record<number, State>
