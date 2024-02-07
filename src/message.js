import messages from './data/messages.json' assert { type: 'json' }

export default class Message {
    static messages = messages

    /**
     * 
     * @param {"welcome"|"goodbye"|"path_to_working_directory"|"error.input"|"error.operation"} type 
     * @param {string} param 
     * @returns {string}
     */
    static get(type, param) {
        if(messages[type]) {
            let message = messages[type]
            if(param) {
                message = Message._replaceVariables(message, param)
            }
            return message + '\n'
        }
        return ''
    }

    /**
     * 
     * @param {string} message 
     * @param {string} param 
     * @returns 
     */
    static _replaceVariables(message, param) {
        const regular = /__(\w+)__/g
        return message.replace(regular, param)
    }

}