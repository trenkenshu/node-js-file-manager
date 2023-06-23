import fsCommands from "./fs-functions.js"

let username = ''
export const validateUsername = (str) => {
  if(/^--username=/.test(str)) {
    username = str.split('=')[1];
    return username
  }
  return ''
}
export const exit = (name) => {
  process.stdout.write(`\nThank you for using File Manager, ${name}, goodbye!\n`)
  process.exit(1)
}
export const processEntry = (chunk) => {
  const data = String(chunk).trim()
  const commandAndArgs = data.split(' ');
  switch (commandAndArgs[0]) {
    case '':
      console.log('Empty input\n')
    break
    case '.exit':
      exit(username)
    break
    case 'up':
      fsCommands.up()
    break
    case 'cd':
        fsCommands.cd(commandAndArgs[1])
    break
    case 'ls':
        fsCommands.ls()
    break
    case 'cat':
      fsCommands.cat(commandAndArgs[1])
    break
    default:
      console.log('def Operation failed')
  }
}