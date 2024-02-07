import options from "./data/options.js"
import Readline from "./readline.js"
import Message from "./message.js"
export class App {
    userName = ''
    readlineInstance = {}

    constructor() {
    }

    init = async() => {

        /** Welcome message
         * @prop {string} value
         */

        for(const value of process.argv) {
            if(value.startsWith(options.userName + '=')) {
                this.userName = value.split('=')[1]
                break
            }
        }

        if(this.userName.length === 0) {
            console.log(Message.get('error.input'))
        } else{
            this.readlineInstance = new Readline()
            await this.readlineInstance.init(this.userName)
        }
    }
}

const app = new App()
app.init()