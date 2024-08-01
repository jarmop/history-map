import { LatLonName } from '../customMap/latLonByName'

export type Nation = Record<
  number,
  { borders: LatLonName[][]; cities: LatLonName[] }
>
