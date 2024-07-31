import fs from 'node:fs'

fs.readFile('../data/worldcities.csv', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const arr = data.split('\n')
  console.log(arr[0])
  const row = arr[1].replace(/"/g, '').split(',')
  const obj = { [row[1]]: [row[2], row[3]] }
  console.log(obj)

  const cities = {}
  const populations = {}
  const countries = {}
  const duplicates = []
  arr.slice(1).forEach((row) => {
    const a = row.replace(/"/g, '').split(',')
    const name = a[1]
    const latLon = [parseFloat(a[2]), parseFloat(a[3])]
    const population = parseInt(a[9])
    const country = a[6]
    if (cities[name]) {
      duplicates.push(name)
    }

    const replacingUSAWithOther = countries[name] === 'USA' && country !== 'USA'

    if (
      name !== undefined &&
      name !== '' &&
      (!cities[name] ||
        replacingUSAWithOther ||
        ((country !== 'USA' || countries[name] === 'USA') &&
          population > populations[name]))
    ) {
      populations[name] = population
      countries[name] = country
      cities[name] = latLon
    }
  })

  console.log('duplicates', duplicates.length)

  fs.writeFile(
    './src/assets/worldcities.json',
    JSON.stringify(cities),
    (err) => {
      if (err) {
        console.error(err)
      } else {
        // file written successfully
      }
    }
  )
})
