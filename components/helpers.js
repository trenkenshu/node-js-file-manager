export const validateUsername = (str) => /^--username=/.test(str) ? str.split('=')[1] :  ''
export const exit = (name) => {
  process.stdout.write(`Thank you for using File Manager, ${name}, goodbye!`)
  process.exit(1)
}