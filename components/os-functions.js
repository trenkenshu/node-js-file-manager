import os from 'node:os'

const osFunctions = (param) => {
  switch (param) {
    case '--EOL':
      console.log(JSON.stringify(os.EOL))
    break
    case '--cpus':
      console.table(os.cpus())
    break
    case '--homedir':
      console.log(os.homedir())
    break
    case '--username':
      console.log(os.userInfo().username)
    break
    case '--architecture':
      console.log(os.arch())
    break
    default:
      console.log('OS Operation failed')
  }
}

export default osFunctions