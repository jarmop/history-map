import { getWorld, reset } from '../storage'
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
          reset()
          location.reload()
        }}
      >
        Reset cache
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
            .then(() => console.log('Data copied to clipboard'))
        }
      >
        Export data
      </button>
    </>
  )
}
