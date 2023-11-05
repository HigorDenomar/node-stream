import csv from 'csv-parser'
import fs from 'fs'
import path from 'path'

export function generateFiles(file: string) {
  const filePath = path.normalize(file)
  const { dir } = path.parse(filePath)
  const outputDir = path.join(dir, 'output')

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }

  const withValueZero = fs.createWriteStream(
    path.join(outputDir, 'with-value-zero.csv'),
    {
      flags: 'a',
    }
  )
  const untilSix = fs.createWriteStream(path.join(outputDir, 'until-six.csv'), {
    flags: 'a',
  })
  const untilTwelve = fs.createWriteStream(
    path.join(outputDir, 'until-twelve.csv'),
    {
      flags: 'a',
    }
  )
  const mostThanTwelve = fs.createWriteStream(
    path.join(outputDir, 'most-than-twelve.csv'),
    {
      flags: 'a',
    }
  )

  fs.createReadStream(filePath)
    .pipe(
      csv({
        separator: ';',
      })
    )
    .on('end', () => {
      withValueZero.end()
      untilSix.end()
      untilTwelve.end()
      mostThanTwelve.end()

      console.log(`\nCSV files generated on: ${outputDir}\n`)
    })
}
