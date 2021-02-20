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
export type Config = {
  options: Generator.GeneratorOptions;
  questions: (ConfigOptions) => Generator.Question[];
  exclude: RegExp[];
};
