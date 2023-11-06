import csv from 'csv-parser'
import fs from 'fs'
import path from 'path'

import { removeInvalidNumberOfPages } from './pipes/removeInvalidNumberOfPages'
import { removeInvalidZipCode } from './pipes/removeInvalidZipCode'
import { savesInvalidInvoiceValue } from './pipes/savesInvalidInvoiceValue'
import { savesValidRows } from './pipes/savesValidsRows'
import { transformAddress } from './pipes/transformAddress'

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

  withValueZero.write(
    'NomeCliente;EnderecoCompleto;ValorFatura;NumeroPaginas\n',
    'utf-8'
  )
  untilSix.write(
    'NomeCliente;EnderecoCompleto;ValorFatura;NumeroPaginas\n',
    'utf-8'
  )
  untilTwelve.write(
    'NomeCliente;EnderecoCompleto;ValorFatura;NumeroPaginas\n',
    'utf-8'
  )
  mostThanTwelve.write(
    'NomeCliente;EnderecoCompleto;ValorFatura;NumeroPaginas\n',
    'utf-8'
  )

  fs.createReadStream(filePath)
    .pipe(
      csv({
        separator: ';',
        headers: [
          'NomeCliente',
          'CEP',
          'RuaComComplemento',
          'Bairro',
          'Cidade',
          'Estado',
          'ValorFatura',
          'NumeroPaginas',
        ],
        mapValues: (args) => args.value.trim().replace(/;/g, ','),
      })
    )
    .pipe(removeInvalidZipCode)
    .pipe(transformAddress)
    .pipe(savesInvalidInvoiceValue(withValueZero))
    .pipe(removeInvalidNumberOfPages)
    .pipe(savesValidRows([untilSix, untilTwelve, mostThanTwelve]))
    .on('finish', () => {
      withValueZero.end()
      untilSix.end()
      untilTwelve.end()
      mostThanTwelve.end()

      console.log(`\nCSV files generated on: ${outputDir}\n`)
    })
}
