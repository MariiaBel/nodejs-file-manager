import * as readline from 'readline/promises'
import Message from './message.js';
import options from './data/options.js';

export default class Readline {
    static instance
    readlineInterface = {}
    commands = {}
    _data = {
        username: '',
        path_to_working_directory: ''
    }

    constructor() {
        if(Readline.instance) return Readline.instance
        Readline.instance = this
    }

    set userName(username) {
        this._data.username = username
    }

    async init() {
        this.commands = await options.commands
        this.readlineInterface = readline.createInterface(process.stdin, process.stdout)
    }
    
    initEventEmitter() {
        this.readlineInterface
            .on('line', (line) => {
                console.log(line)
                console.log(this.commands[line])
                if(this.commands[line]) {
                    this.commands[line]()
                } else {
                    let message = Message.get('error.input')
                    console.log(message)
                }
            }).on('close', async() => {
                await this.close()
                let message = Message.get('goodbye', this._data.username)
                console.log(message)
                // this.write('goodbye', this._data.username)
            })
    }

    write(type, param) {
        let message = Message.get(type, param)
        if(!message) {
            message = Message.get('error.operation')
        } else {
            this.readlineInterface.write(message)
        }
    }

    async close() {
        await this.readlineInterface.close()
    }
}