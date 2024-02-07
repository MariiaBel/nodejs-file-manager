import Readline from "../readline.js"
import FileSystem from "../fileSystem.js"

const FSInstance = new FileSystem()

const options = {
    userName: '--username',
    commands:  {
        '.exit': () => new Readline().close(),
        'ls': async () => await FSInstance.ls()
    }
}

export default options