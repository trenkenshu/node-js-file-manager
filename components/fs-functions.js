import path from 'node:path'
import fs from 'node:fs/promises'
import { createHash } from 'crypto'
import { createReadStream, createWriteStream } from 'node:fs'
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
      process.platform === 'win32' && process.argv[1].split(path.sep)[0] + path.sep
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
        name: item.name,
        type: item.isDirectory() ? 'dir' : 'file'}
    }))
  },
  cat: async function(pathToFile) {
    try {
      const fd = await fs.open(path.resolve(this.curDir, pathToFile));
      const readStream = fd.createReadStream()
      readStream.pipe(process.stdout)
      readStream.once('end', () => this.printCurrent())
    } catch {
      console.log('Operation failed')
      this.printCurrent()
    }
  },
  add: async function(filename) {
    try {
      await fs.readFile(path.resolve(this.curDir, filename), { encoding: 'utf-8'})
      console.log('FS operation failed')
    } catch {
      await fs.writeFile(path.resolve(this.curDir, filename), '')
    }
    this.printCurrent()
  },
  rn: async function(paths) {
    try {
      await fs.rename(path.resolve(this.curDir, paths[0]), path.resolve(this.curDir, paths[1]))
    } catch {
      console.log('FS operation failed')
    }
    this.printCurrent()
  },
  cp: async function(paths, moving = false) {
    const from = path.resolve(this.curDir, paths[0])
    const to = path.resolve(this.curDir, paths[1])
    try {
      await fs.readFile(from, { encoding: 'utf-8'})
    } catch {
      console.log('FS operation failed')
      this.printCurrent()
      return
    }
    try {
      await fs.readdir(to)
    } catch {
      fs.mkdir(to, { recursive: true })
    }
    await fs.writeFile(path.join(to, path.basename(from)), '')
    const readStream = createReadStream(from)
    const destination = path.join(to, path.basename(from))
    const writeStream = createWriteStream(destination)
    readStream.pipe(writeStream)
    readStream.on('end', async () => {
      moving && await fs.rm(from)
      this.printCurrent()
    })
  },
  rm: async function(deletePath) {
    try {
      await fs.rm(path.resolve(this.curDir, deletePath))
    } catch {
      console.log('FS operation failed')
    }
    this.printCurrent()
  },
  hash: async function(pathToFile) {
    let content = '';
    try {
        content = await fs.readFile(path.resolve(this.curDir, pathToFile))
    } catch {
        throw Error('FS operation failed')
    }
    console.log(createHash('sha256').update(content).digest('hex'))
    this.printCurrent()
  }
}
export default fsCommands