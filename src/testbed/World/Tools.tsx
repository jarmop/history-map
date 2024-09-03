import { getWorld, resetNavigation, resetWorld } from '../data/storage'
import { prepareForExport } from '../geographicData'

export function Tools() {
  return (
    <>
      <br />
      <button
        onClick={() => {
          resetNavigation()
          location.reload()
        }}
      >
        Reset navigation
      </button>
      <button
        onClick={() => {
          resetWorld()
          location.reload()
        }}
      >
        Reset data
      </button>
      <button
        onClick={() => {
          const world = getWorld()
          if (!world) {
            console.log('wolrd not stored')
            return
          }

          navigator.clipboard
            .writeText(JSON.stringify(prepareForExport(world)))
            .then(() => console.info('Data copied to clipboard'))
        }}
      >
        Export data
      </button>
    </>
  )
}
