import { validateUsername, processEntry, exit } from './components/helpers.js'
import fsCommands from './components/fs-functions.js'

const username = validateUsername(process.argv[2])
username
  ? console.log(`Welcome to the File Manager, ${username}!`)
  : console.log(
      'No username specified\nUsage: npm run start -- --username=someNameOfYourChoise\n'
    ) && process.exit(1)
fsCommands.printCurrent();

process.stdin.on('data', processEntry)

process.on('SIGINT', () => exit(username))
