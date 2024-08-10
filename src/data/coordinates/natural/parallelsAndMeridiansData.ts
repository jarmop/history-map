import { LatLon } from '../../data'

export const meridians: LatLon[][] = []

for (let lon = -180; lon <= 180; lon += 10) {
  const meridian: LatLon[] = []
  for (let lat = -80; lat <= 80; lat += 10) {
    meridian.push([lat, lon])
  }
  meridians.push(meridian)
}

export const parallels: LatLon[][] = []

for (let lat = -80; lat <= 80; lat += 10) {
  const parallel: LatLon[] = []
  for (let lon = -180; lon <= 180; lon += 10) {
    parallel.push([lat, lon])
  }
  parallels.push(parallel)
}
