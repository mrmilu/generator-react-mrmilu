import Generator from 'yeoman-generator';
import Configuration from './config';
import path from 'path';
import glob from 'glob';
import type { ConfigOptions } from './types';

const TEMPLATE_BASE_DIR = path.resolve(__dirname, '../app/template');

export default class GeneratorComponent extends Generator {
  private destination = path.resolve('.', 'sample');
  private projectName = 'react-app';
  private hasStyledComponents = true;
  private hasTailwind = true;
  private hasRedux = true;
  private hasRecoil = false;
  private hasMobx = false;
  private hasAxios = true;
  private hasApollo = false;

  constructor(args: string | string[], options: Generator.GeneratorOptions) {
    super(args, options);
    this.projectName = args?.length ? args[0] : this.projectName;
    this.destination = path.resolve(this.destination, this.projectName);
  }

  private get _canonicalName() {
    return this.projectName && this.projectName.split('-').map(this._capitalize).join('');
  }

  private get _templateData(): ConfigOptions {
    return {
      projectName: this.projectName,
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
    return this.prompt(Configuration.questions(this._templateData)).then((answers) => {
      console.log(this.destination, answers);
    });
  }

  writing() {
    this._copyBaseFiles();
  }

  private _copyBaseFiles() {
    const { exclude } = Configuration;
    glob.sync('*', { cwd: TEMPLATE_BASE_DIR }).forEach((file) => {
      if (!exclude.some((ex) => ex.test(file))) {
        this._copyFile(file, [this.destination, file.replace('.ejs', '')]);
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
    this.fs.copyTpl(this.templatePath(...inputArray), this.destinationPath(...outputArray), data);
  }
}
