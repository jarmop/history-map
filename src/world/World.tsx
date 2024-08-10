import { useEffect, useState } from 'react'
import { CustomMap } from '../CustomMap/CustomMap'
import * as storage from '../storage'
import { useData, useYears } from '../data/useData'
import { DevTools } from './DevTools'
import { YearInput } from './YearInput'

export function World() {
  const years = useYears()
  const [year, setYear] = useState(storage.getYear() || years[0])
  const [config, setConfig] = useState(storage.getConfig)

  useEffect(() => storage.setYear(year), [year])

  const { islands, stateBorders } = useData(year)

  return (
    <div>
      <div style={{ position: 'fixed', fontSize: '40px' }}>{year}</div>
      <CustomMap
        islands={islands}
        stateBorders={stateBorders}
        config={config}
      />
      <YearInput year={year} years={years} onChange={(year) => setYear(year)} />


      <DevTools config={config} setConfig={setConfig} />
    </div>
  )
}
