export type ICustomerObject = {
  NomeCliente: string
  CEP: string
  RuaComComplemento: string
  Bairro: string
  Cidade: string
  Estado: string
  ValorFatura: string
  NumeroPaginas: string
}

export type INewCustomerObject = {
  NomeCliente: string
  EnderecoCompleto: string
  ValorFatura: string
  NumeroPaginas: string
}
