import { spawn } from 'child_process';
export default class Util {
    static hasFrame(frame) {

    }

    static getCmd(frame) {
        let cmd = {};
        switch (frame) {
            case 'taro':
                cmd = {
                    cmd: 'taro',
                    params: ['init']
                };
                break;
            case 'mpvue':
                cmd = {
                    cmd: 'vue',
                    params: ['init', 'mpvue/mpvue-quickstart']
                };
                break;
            case 'wepy':
                cmd = {
                    cmd: 'wepy',
                    params: ['init', 'standard']
                };
                break;
            case 'megalo':
                cmd = {
                    cmd: 'megalo',
                    params: []
                };
                break;
        }

        return cmd;
    }

    static runCmd(cmd, params, cwd, cb) {
        const runner = spawn(cmd, [...params, cwd], {
            stdio: 'inherit',
        })

        runner.on('error', (error) => {
            console.log(error);
        })

        runner.on('close', (code) => {
            if (code === 0) {
                cb && cb(cwd);
            }
        })
    }
}