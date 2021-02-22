import Generator from 'yeoman-generator';
import Configuration from './config';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import type { ConfigAnswers, ConfigOptions } from './types';

const TEMPLATE_DIR = '../app/templates';
const TEMPLATE_BASE_DIR = path.resolve(__dirname, TEMPLATE_DIR);
const CONFIG_DIR = '_configs';

export default class GeneratorComponent extends Generator {
  private defaultGlobOptions = { dot: true, nodir: true, cwd: TEMPLATE_BASE_DIR };
  private destination = path.resolve('.');
  private projectName = 'react-app';
  private hasStyledComponents = true;
  private hasTailwind = true;
  private hasRedux = true;
  private hasRecoil = false;
  private hasMobx = false;
  private hasAxios = true;
  private hasApollo = false;
  private ask = true;
  private save = false;

  constructor(args: string | string[], options: Generator.GeneratorOptions) {
    super(args, options);
    const responses = this.config.getAll();
    if (responses && Object.keys(responses).length) {
      this.ask = false;
    }
    this.save = !!options.save;
    this.projectName = args?.length ? args[0] : this.projectName;
    this.destination = path.resolve(this.destination, this.projectName);
  }

  private get _canonicalName() {
    return this.projectName && this.projectName.split('-').map(this._capitalize).join('');
  }

  private get _templateData(): ConfigOptions {
    return {
      projectName: this.projectName,
      projectNameCanonical: this._canonicalName,
      hasStyledComponents: this.hasStyledComponents,
      hasTailwind: this.hasTailwind,
      hasRedux: this.hasRedux,
      hasRecoil: this.hasRecoil,
      hasMobx: this.hasMobx,
      hasAxios: this.hasAxios,
      hasApollo: this.hasApollo
    };
  }

  prompting() {
    if (!this.ask) {
      this._setValues();
      return;
    }
    return this.prompt<ConfigAnswers>(Configuration.questions(this._templateData)).then((answers) => {
      if (answers && Object.keys(answers).length) {
        this._setValues(answers);
      }
    });
  }

  writing() {
    this._copyFiles();

    if (this.hasStyledComponents) {
      this._copyFiles('with-styled');
    } else {
      this._copyFiles('without-styled');
    }

    if (this.hasTailwind) {
      this._copyFiles('with-tailwind');
    }

    if (this.hasRedux) {
      this._copyFiles('with-redux');
    } else if (this.hasRecoil) {
      this._copyFiles('with-recoil');
    }

    if (this.hasAxios) {
      this._copyFiles('with-axios');
    }
    if (this.hasApollo) {
      this._copyFiles('with-apollo');
    }
  }

  end() {
    const { endCmd } = Configuration;
    endCmd(this._templateData)
      .filter(Boolean)
      .forEach(({ command, args }) => this._execCommand(command, args));
  }

  private _execCommand(cmd: string, args: string[]) {
    const cwd = this.destination;
    return this.spawnCommandSync(cmd, args, { cwd });
  }

  private _copyFiles(dir?: string) {
    const { exclude } = Configuration;
    const toRemove = dir ? path.join(CONFIG_DIR, dir) : '';
    const find = toRemove ? path.join(toRemove, '**', '*') : '**/*';
    glob.sync(find, this.defaultGlobOptions).forEach((file) => {
      if (dir || !exclude.some((ex) => ex.test(file))) {
        this._copyFile(file, [this.destination, file.replace(toRemove, '')]);
      }
    });
  }

  private _capitalize(value?: string) {
    if (!value) {
      return '';
    }
    return value.substr(0, 1).toUpperCase() + value.substr(1, value.length);
  }

  private _copyFile(input: string | string[], output: string | string[], data = this._templateData) {
    const outputArray = Array.isArray(output) ? output : [output].filter(Boolean);
    const inputArray = Array.isArray(input) ? input : [input].filter(Boolean);
    if (!inputArray.length || !outputArray.length || !data) {
      return;
    }
    const fromFile = this.templatePath(...inputArray);
    const toFile = this.destinationPath(...outputArray).replace('.ejs', '');
    if (fs.statSync(fromFile).isFile()) {
      this.fs.copyTpl(fromFile, toFile, data);
    } else {
      this.fs.copy(fromFile, toFile);
    }
  }

  private _setValues(answers: ConfigAnswers = this.config.getAll()) {
    const { project_name, styled_components, tailwind, state, api } = answers;
    if (this.save) {
      Object.entries(answers).forEach(([key, value]) => {
        this.config.set(key, value);
      });
      this.config.save();
    }
    this.projectName = project_name;
    this.hasStyledComponents = styled_components;
    this.hasTailwind = tailwind;

    this.hasApollo = this.hasAxios = false;
    switch (api) {
      case 'apollo':
        this.hasApollo = true;
        break;
      case 'axios':
      default:
        this.hasAxios = true;
    }

    this.hasMobx = this.hasRecoil = this.hasRedux = false;
    switch (state) {
      case 'mobx':
        this.hasMobx = true;
        break;
      case 'recoil':
        this.hasRecoil = true;
        break;
      case 'redux':
      default:
        this.hasRedux = true;
    }
  }
}
