import { useEffect, useRef } from 'react'

interface YearInput {
  year: number
  years: number[]
  onChange: (year: number) => void
}

export function YearInput({ year, years, onChange: setYear }: YearInput) {
  const inputDomRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const inputElement = inputDomRef.current
    if (inputElement) {
      inputElement.value = year.toString()
    }
  }, [year])

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
    <div className='yearinput'>
      <button
        onClick={() =>
          yearOfPreviousChange !== undefined && setYear(yearOfPreviousChange)
        }
        disabled={yearOfPreviousChange === undefined}
      >
        {yearOfPreviousChange || '-'}
      </button>
      <button onClick={() => setYear(year - 100)}>{'- 100'}</button>
      <button onClick={() => setYear(year - 10)}>{'- 10'}</button>
      <button onClick={() => setYear(year - 1)}>{'- 1'}</button>
      <input
        ref={inputDomRef}
        type="text"
        defaultValue={year}
        onChange={(e) => {
          const year = parseInt(e.target.value)
          !isNaN(year) && setYear(year)
        }}
        style={{ width: '30px' }}
      />
      <button onClick={() => setYear(year + 1)}>{'+ 1'}</button>
      <button onClick={() => setYear(year + 10)}>{'+ 10'}</button>
      <button onClick={() => setYear(year + 100)}>{'+ 100'}</button>
      <button
        onClick={() =>
          yearOfNextChange !== undefined && setYear(yearOfNextChange)
        }
        disabled={yearOfNextChange === undefined}
      >
        {yearOfNextChange || '-'}
      </button>
    </div>
  )
}
