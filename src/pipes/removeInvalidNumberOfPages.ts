import { Transform } from 'stream'

import { ICustomerObject } from '../types'

export const removeInvalidNumberOfPages = new Transform({
  objectMode: true,
  transform(chunk: ICustomerObject, encoding, callback) {
    const numberOfPages = Number(chunk.NumeroPaginas)

    const isValidNumberOfPages = numberOfPages % 2 === 0

    if (isValidNumberOfPages) {
      this.push(chunk)
    }

    callback()
  },
})
