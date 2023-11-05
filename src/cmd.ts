import readlineSync from 'readline-sync'

async function main() {
  console.log('\n** Only .txt files supported **\n')

  const filePath = readlineSync.question(
    'Type the file path without extension\n(default: input): ',
    {
      isFile: true,
      defaultInput: 'input',
    }
  )

  const splitted = filePath.split('/')
  splitted.pop()
  const path = splitted.join('/')

  console.log(`\nCSV files generated on: ${path}/output\n`)
}

main()
