import options from "./data/options.js"
import Readline from "./readline.js"
export class App {
    userName = ''
    readlineInstance = {}

    constructor() {
    }

    init = async() => {
        this.readlineInstance = new Readline()
        await this.readlineInstance.init()
        
        /** Welcome message
         * @prop {string} value
         */
        process.argv.forEach(value => {
            if(value.startsWith(options.userName + '=')) {
                this.userName = value.split('=')[1]
                this.readlineInstance.write('welcome', this.userName)
                this.readlineInstance.initEventEmitter()
            }
        })

        if(this.userName.length === 0) {
            this.readlineInstance.write('error.input')
            this.readlineInstance.close()
        }
    }
}

const app = new App()
app.init()