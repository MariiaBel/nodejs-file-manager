import State from './state.js';
import fs from 'fs/promises'
export default class FileSystem {

    constructor() {
        this.stateInstance = new State()
    }

    async ls() {
        const fsNodes = await fs.readdir(this.stateInstance.currentDirectory,{withFileTypes: true})

        fsNodes
            .filter(dirent => dirent.isSymbolicLink())
            .sort((left,right) => right.isDirectory() - left.isDirectory())
            .forEach((dirent, index) => {
                console.log(`${index} - ${dirent.name} - ${dirent.isDirectory() ? 'directory' : 'file' }`)
            })
    }
}