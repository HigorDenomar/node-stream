<div align="center">
  <h1>Manipulação de arquivos</h1>

  <p>Utilizando readStream e writeStream pra manipular arquivos de forma otimizada.
  <p>
</div>

### Sobre o projeto

Esta é uma CLI (Command Line Interface) para converter arquivos `.txt` em planilhas `.csv`
Pra isso foi utilizado as seguintes bibliotecas:

- [readline-sync](https://www.npmjs.com/package/readline-sync) - Pra capturar o input do usuário
- [csv-parser](https://www.npmjs.com/package/csv-parser) - Pra transformar as linhas do `.txt` em um objeto

Após capturar o input do usuário, por fins de performance, a aplicação cria um [readStream](https://nodejs.org/api/fs.html#filehandlecreatereadstreamoptions) para ler o arquivo informado linha por linha. Assim, não importa o tamanho do arquivo, pois ele vai ser lido por demanda.

Com a stream de leitura criada, utilizo os pipes para manipular cada linha e salvar utilizando o [writeStream](https://nodejs.org/api/fs.html#filehandlecreatewritestreamoptions), que segue a mesma lógica de melhorar a performance, gravando o arquivo linha por linha.

Porém antes de salvar, criei alguns pipes que fazem validação conforme as linhas do arquivo `.txt` são lidas, sendo eles:

- `removeInvalidZipCode` - Remove as linhas onde o CEP é inválido.
- `transformAddress` - Une os campos RuaComComplemento, Bairro, Cidade, Estado e CEP em um único campo EnderecoCompleto.
- `savesInvalidInvoiceValue` - Salva em um arquivo separado as linhas em que o valor da fatura é zero.
- `removeInvalidNumberOfPages` - Remove as linhas em que o número de páginas é ímpar.
- `savesValidRows` - Salva as linhas que passaram pelos pipes anteriores em arquivos separados, de acordo o número de página

Algumas regras usadas nos pipes são:

- O número de páginas dos registros devem ser par;
- Salvar em um arquivo todos os registros com até 6 páginas;
- Salvar em outro arquivo os registros com até 12 páginas;
- Salvar outro arquivo com os registros com mais de 12 páginas;
- Salva um arquivo diferente com os registros com fatura de valor zero, independente do número de páginas;

### Como utilizar

1. Baixe o repositório e instale as dependências:

```zsh
git clone https://github.com/HigorDenomar/node-stream.git
cd node-stream
npm install
```

2. Execute o projeto:

```zsh
npm start
```

<br>

PS: O arquivo txt deve seguir a seguinte estrutura: `NomeCliente; CEP; RuaComComplemento; Bairro; Cidade; Estado; ValorFatura; NumeroPaginas`
