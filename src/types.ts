import Generator from 'yeoman-generator';

export type ConfigOptions = {
  projectName: string;
  hasStyledComponents: boolean;
  hasTailwind: boolean;
  hasRedux: boolean;
  hasRecoil: boolean;
  hasMobx: boolean;
  hasAxios: boolean;
  hasApollo: boolean;
};

export type CmdAction = {
  cwd: string;
  cmd: string;
};

export type ConfigAnswers = {
  project_name: string;
  styled_components: boolean;
  tailwind: boolean;
  state: 'redux' | 'recoil' | 'mobx';
  api: 'axios' | 'apollo';
};

export type Config = {
  questions: (opts: ConfigOptions) => Generator.Question<ConfigAnswers>[];
  exclude: RegExp[];
  endCmd: (string | CmdAction)[];
};
