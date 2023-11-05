import readlineSync from 'readline-sync'

import { generateFiles } from './service'

async function main() {
  console.log('\n** Only .txt files supported **\n')

  const filePath = readlineSync.question(
    'Type the file path without extension\n(default: input): ',
    {
      isFile: true,
      defaultInput: 'input',
    }
  )

  generateFiles(filePath + '.txt')
}

main()
