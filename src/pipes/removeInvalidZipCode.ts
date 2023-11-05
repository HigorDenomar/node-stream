import { Transform } from 'stream'

import { ICustomerObject } from '../types'

export const removeInvalidZipCode = new Transform({
  objectMode: true,
  transform(chunk: ICustomerObject, encoding, callback) {
    const zipCode = chunk.CEP

    const isValidZipCode =
      Number(zipCode) != 0 &&
      !isNaN(Number(zipCode)) &&
      zipCode.length >= 7 &&
      zipCode.length <= 8

    if (isValidZipCode) {
      this.push(chunk)
    }

    callback()
  },
})
