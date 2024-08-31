import { getWorld, resetWorld } from '../storage'
import { resetNavigation } from './data/storage'

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
        onClick={() =>
          navigator.clipboard
            .writeText(JSON.stringify(getWorld()))
            .then(() => console.info('Data copied to clipboard'))
        }
      >
        Export data
      </button>
    </>
  )
}
