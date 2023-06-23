import path from 'node:path'
import fs from 'node:fs/promises'
const fsCommands = {
  root:  process.platform === 'win32' ? process.argv[1].split(path.sep)[0] : '/',
  curDir: path.dirname(process.argv[1]),
  printCurrent: function() {
    process.stdout.write(`\nYou are currently in ${this.curDir}\n`)
  },
  up: function() {
    if (this.curDir !== this.root) {
      const newDir = this.curDir.slice(0, this.curDir.lastIndexOf(path.sep))
      this.curDir = newDir
    }
    this.printCurrent()
  },
}
export default fsCommands