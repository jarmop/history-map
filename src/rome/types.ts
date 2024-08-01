import { LatLonName } from '../customMap/latLonByName'

export type State = Record<
  number,
  { borders: LatLonName[][]; cities: LatLonName[] }
>
