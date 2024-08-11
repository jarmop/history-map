import { getWorld, resetNavigation, resetWorld } from '../storage'
import { Config } from '../types'

interface DevToolsProps {
  config: Config
  setConfig: (config: Config) => void
}

export function DevTools({ config, setConfig }: DevToolsProps) {
  return (
    <>
      <h4>Dev tools</h4>
      <button
        onClick={() =>
          setConfig({
            ...config,
            zoomEnabled: !config.zoomEnabled,
          })
        }
      >
        {`${config.zoomEnabled ? 'Disable' : 'Enable'} Zoom`}
      </button>
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
      <input
        id="parallelsAndMeridians"
        type="checkbox"
        onChange={(e) =>
          setConfig({ ...config, showParallelsAndMeridians: e.target.checked })
        }
      />
      <label htmlFor="parallelsAndMeridians">
        Show parallels and meridians
      </label>
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
