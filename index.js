import { validateUsername, exit} from "./components/helpers.js";

const username = validateUsername(process.argv[2]);
username
  ? console.log(`Welcome to the File Manager, ${username}!`)
  : console.log('No username specified\nUsage: npm run start -- --username=someNameOfYourChoise\n')
    && process.exit(1)

process.stdin.on('data', (chunk) =>
  console.log('Got', String(chunk))
)

process.on('SIGINT', () => exit(username))