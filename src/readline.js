import * as readline from 'readline/promises'
import Message from './message.js';
import options from './data/options.js';

export default class Readline {
    static instance
    readlineInterface = {}
    commands = {}

    constructor() {
        if(Readline.instance) return Readline.instance
        Readline.instance = this
    }

    async init() {
        this.commands = await options.commands
        this.readlineInterface = readline.createInterface(process.stdin, process.stdout)
    }
    
    initEventEmitter() {
        this.readlineInterface.on('line', (line) => {
            if(this.commands[line]) {
                this.commands[line]()
            } else {
                let message = Message.get('error.input')
                console.log(message)
            }
        })
    }

    write(type, param) {
        let message = Message.get(type, param)
        if(!message) message = Message.get('error.operation')
        this.readlineInterface.write(message)
    }

    close() {
        this.readlineInterface.close()
    }
}