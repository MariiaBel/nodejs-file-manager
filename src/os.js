import os from 'os'
export default class OS {
    
    static getHomeDirectory() {
        return os.homedir()
    }
}