import inquirer from 'inquirer';
import commander from 'commander';
import { spawn } from 'child_process';
import which from 'which';
import config from '../config';
import utils from './utils';

class Create {
    constructor() {
        this.inquirer = inquirer;
        this.commander = commander;
        this.frame = null;
        this.project = null;
    }

    async run() {
        const frameQuestions = {
            type: 'list',
            name: 'frame',
            message: '请选择一个框架',
            choices: config.frame
        }
        
        // 获取框架
        const { frame } = await this.inquirer.prompt(frameQuestions);
        this.frame = frame;

        const commanderQuestions = {
            type: 'input',
            name: 'project',
            message: '请输入项目名称',
            validate(v) {
                const done = this.async();
                if (!v.trim()) {
                    done('项目名称不能为空');
                }

                done(null, true);
            },
        }
        // 获取输入项目名称
        const { project } = await this.inquirer.prompt(commanderQuestions);
        this.project = project;

        // 获取命令
        const { cmd, params } = utils.getCmd(this.frame);
        utils.runCmd(cmd, params, this.project, (cwd) => {
            console.log(cwd);
        })

    }
}

const create = new Create();
create.run();