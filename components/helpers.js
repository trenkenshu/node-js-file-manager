import fsCommands from "./fs-functions.js"

export const validateUsername = (str) => /^--username=/.test(str) ? str.split('=')[1] :  ''
export const exit = (name) => {
  process.stdout.write(`\nThank you for using File Manager, ${name}, goodbye!`)
  process.exit(1)
}
export const processEntry = (chunk) => {
  const data = String(chunk).trim()
  const commandAndArgs = data.split(' ');
  switch (commandAndArgs[0]) {
    case 'up':
      fsCommands.up()
    break
    default:
      console.log('Operation failed')
  }
}