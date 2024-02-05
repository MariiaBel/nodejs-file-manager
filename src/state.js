import path from 'path'

export default class State {
    static instance
    _data = {
        username: '',
        currentDirectory: ''
    }

    constructor() {
        if(State.instance) return State.instance
        State.instance = this
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
        console.log(currentDirectory, 'current dir ++++++')
        console.log(typeof currentDirectory)
        // if(typeof currentDirectory === 'string') currentDirectory = path.dirname(currentDirectory)
        
        // console.log(currentDirectory, 'current dir ++++++')
        this._data.currentDirectory = currentDirectory
    }
}