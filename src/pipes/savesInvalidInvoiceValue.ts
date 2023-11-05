import { Transform } from 'stream'

import { WriteStream } from 'fs'
import { ICustomerObject } from '../types'

export const savesInvalidInvoiceValue = (stream: WriteStream) =>
  new Transform({
    objectMode: true,
    transform(chunk: ICustomerObject, encoding, callback) {
      if (Number(chunk.ValorFatura) === 0) {
        const csvRow = Object.values(chunk).join(';')
        stream.write(csvRow + '\n', 'utf8')
      }

      callback()
    },
  })
