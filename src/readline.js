import * as readline from 'readline/promises'
import Message from './message.js';
import options from './data/options.js';
import OS from './os.js'

export default class Readline {
    static instance
    readlineInterface = {}
    commands = {}
    _data = {
        username: '',
        currentDirectory: ''
    }

    constructor() {
        if(Readline.instance) return Readline.instance
        Readline.instance = this
    }

    set userName(username) {
        this._data.username = username
    }

    get userName() {
        return this._data.username
    }

    get currentDirectory() {
        return this._data.currentDirectory
    }

    set currentDirectory(currentDirectory) {
        this._data.currentDirectory = currentDirectory
    }

    async init(username) {
        this.userName = username
        this.currentDirectory = OS.getHomeDirectory()

        this.commands = await options.commands
        this.readlineInterface = readline.createInterface(process.stdin, process.stdout)
        this.write('welcome', this.userName)
        this.writeCurrentDirectory()
        this.initEventEmitter()
    }
    
    initEventEmitter() {
        this.readlineInterface
            .on('line', (line) => {
                if(this.commands[line]) {
                    this.commands[line]()
                } else {
                    console.log(Message.get('error.input'))
                }

                this.writeCurrentDirectory()

            }).on('close', async() => {
                await this.closeWithGoodbye()
            }).on('SIGINT', async() => {
                await this.closeWithGoodbye()
            })
    }

    write(type, param) {
        let message = Message.get(type, param)
        if(!message) {
            message = Message.get('error.operation')
        } else {
            console.log(message)
        }
    }

    writeCurrentDirectory() {
        this.write('path_to_working_directory', this._data.currentDirectory)
    }

    async close() {
        await this.readlineInterface.close()
    }

    async closeWithGoodbye() {
        await this.close()
        this.write('goodbye', this._data.username)
    }
}