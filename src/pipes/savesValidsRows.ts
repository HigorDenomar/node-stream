import { WriteStream } from 'fs'
import { Transform } from 'stream'

import { INewCustomerObject } from '../types'

export const savesValidRows = (
  streams: [WriteStream, WriteStream, WriteStream]
) =>
  new Transform({
    objectMode: true,
    transform(chunk: INewCustomerObject, encoding, callback) {
      const [untilSix, untilTwelve, mostThanTwelve] = streams
      const csvRow = Object.values(chunk).join(';')

      const numberOfPage = Number(chunk.NumeroPaginas)

      if (numberOfPage <= 6) {
        untilSix.write(csvRow + '\n', 'utf8')
      } else if (numberOfPage <= 12) {
        untilTwelve.write(csvRow + '\n', 'utf8')
      } else {
        mostThanTwelve.write(csvRow + '\n', 'utf8')
      }

      callback()
    },
  })
