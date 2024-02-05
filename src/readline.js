import * as readline from 'readline/promises'
import Message from './message.js';
import options from './data/options.js';
import OS from './os.js'
import State from "./state.js"

export default class Readline {
    static instance
    stateInstance
    readlineInterface = {}
    commands = {}

    constructor() {
        if(Readline.instance) return Readline.instance
        Readline.instance = this
    }

    async init(username) {
        this.stateInstance = new State()
        this.stateInstance.userName = username
        this.stateInstance.currentDirectory = OS.getHomeDirectory()

        this.commands = await options.commands
        this.readlineInterface = readline.createInterface(process.stdin, process.stdout)
        this.write('welcome', this.stateInstance.userName)
        this.writeCurrentDirectory()
        this.initEventEmitter()
    }
    
    initEventEmitter() {
        this.readlineInterface
            .on('line', async (line) => {
                if(this.commands[line]) {
                    await this.commands[line]()
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
        this.write('path_to_working_directory', this.stateInstance.currentDirectory)
    }

    async close() {
        await this.readlineInterface.close()
    }

    async closeWithGoodbye() {
        await this.close()
        this.write('goodbye', this.stateInstance.userName)
    }
}