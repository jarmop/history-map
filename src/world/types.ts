import { LatLonName } from '../customMap/latLonByName'

export type State = { borders: string[][]; cities: LatLonName[] }

export type StateByYear = Record<number, State>
