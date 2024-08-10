import { LatLon } from '../../data'

export const meridians: LatLon[][] = []

for (let lon = -180; lon <= 180; lon += 10) {
  meridians.push([
    [-85, lon],
    [85, lon],
  ])
}

export const parallels: LatLon[][] = []

parallels.push([
  [-85, -180],
  [-85, 180],
])

for (let lat = -80; lat <= 80; lat += 10) {
  parallels.push([
    [lat, -180],
    [lat, 180],
  ])
}

parallels.push([
  [85, -180],
  [85, 180],
])
