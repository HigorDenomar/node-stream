import readlineSync from 'readline-sync'

import { generateFiles } from './service'

async function main() {
  console.log('\n** Only .txt files supported **\n')

  const filePath = readlineSync.question('Type the file path: ', {
    exists: true,
    limit: /\.txt$/i,
    limitMessage: '\nError, please enter the path of a .txt file\n',
  })

  generateFiles(filePath)
}

main()
