import { LatLonName } from '../customMap/latLonByName'

export type State = { borders: LatLonName[][]; cities: LatLonName[] }

export type StateByYear = Record<number, State>
