import path from 'node:path'
import fs from 'node:fs/promises'
const fsCommands = {
  root:  process.platform === 'win32' ? process.argv[1].split(path.sep)[0] + path.sep : path.sep,
  curDir: path.dirname(process.argv[1]),
  printCurrent: function() {
    process.stdout.write(`\nYou are currently in ${this.curDir}\n`)
  },
  up: function() {
    if (this.curDir !== this.root) {
      this.curDir = path.resolve(this.curDir, './..')
    }
    this.printCurrent()
  },
  cd: async function(newPath) {
    try {
      if(path.isAbsolute(newPath)) {
        await fs.readdir(newPath)
      } else {
        await fs.readdir(path.resolve(this.curDir, newPath))
      }
    } catch {
      console.log('Operation failed')
      this.printCurrent()
      return
    }
    if(path.isAbsolute(newPath)) {
      this.curDir = newPath
    } else {
      this.curDir = path.resolve(this.curDir, newPath)
    }
    this.printCurrent()
  },
  ls: async function() {
    const content = await fs.readdir(this.curDir, { withFileTypes: true })
    console.table(content.map((item, index) => {
      return {
        index,
        name: item.name,
        type: item.isDirectory() ? 'dir' : 'file'}
    }))
  }
}
export default fsCommands