import { useEffect, useState } from 'react'
import { CustomMap } from '../customMap/CustomMap'
import * as storage from '../storage'
import { useData, useYears } from './useData'

export function World() {
  const years = useYears()
  const [year, setYear] = useState(storage.getYear() || years[0])
  const [config, setConfig] = useState(storage.getConfig)

  useEffect(() => storage.setYear(year), [year])

  const { islands, stateBorders } = useData(year)

  let yearOfPreviousChange: number | undefined = undefined
  let yearOfNextChange: number | undefined = undefined
  years.forEach((testYear) => {
    if (testYear < year) {
      yearOfPreviousChange = testYear
    }

    if (yearOfNextChange === undefined && testYear > year) {
      yearOfNextChange = testYear
    }
  })

  return (
    <div>
      <div style={{ position: 'fixed', fontSize: '40px' }}>{year}</div>
      <CustomMap
        islands={islands}
        stateBorders={stateBorders}
        config={config}
      />
      <button
        onClick={() =>
          yearOfPreviousChange !== undefined && setYear(yearOfPreviousChange)
        }
        disabled={yearOfPreviousChange === undefined}
      >
        {yearOfPreviousChange || '-'}
      </button>
      <button onClick={() => setYear(year - 10)}>{'- 10'}</button>
      <button onClick={() => setYear(year - 1)}>{'- 1'}</button>
      <button onClick={() => setYear(year + 1)}>{'+ 1'}</button>
      <button onClick={() => setYear(year + 10)}>{'+ 10'}</button>
      <button
        onClick={() =>
          yearOfNextChange !== undefined && setYear(yearOfNextChange)
        }
        disabled={yearOfNextChange === undefined}
      >
        {yearOfNextChange || '-'}
      </button>
      <h4>Dev tools</h4>
      <button
        onClick={() =>
          setConfig((config) => ({
            ...config,
            zoomEnabled: !config.zoomEnabled,
          }))
        }
      >
        {`${config.zoomEnabled ? 'Disable' : 'Enable'} Zoom`}
      </button>
      <button
        onClick={() => {
          storage.reset()
          location.reload()
        }}
      >
        Reset cache
      </button>
    </div>
  )
}
