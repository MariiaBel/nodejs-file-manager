import Readline from "../readline.js"
const options = {
    userName: '--username',
    commands:  {
        '.exit': () => new Readline().close()
    }
}

export default options