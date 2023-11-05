import { Transform } from 'stream'

import { ICustomerObject, INewCustomerObject } from '../types'

export const transformAddress = new Transform({
  objectMode: true,
  transform(chunk: ICustomerObject, encoding, callback) {
    const customer: INewCustomerObject = {
      NomeCliente: chunk.NomeCliente,
      EnderecoCompleto: `${chunk.RuaComComplemento}, ${chunk.Bairro}, ${chunk.Cidade} - ${chunk.Estado}, ${chunk.CEP}`,
      NumeroPaginas: chunk.NumeroPaginas,
      ValorFatura: chunk.ValorFatura,
    }

    this.push(customer)
    callback()
  },
})
