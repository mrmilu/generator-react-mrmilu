import type { Config } from './types';

const config: Config = {
  questions: ({ projectName, hasStyledComponents, hasTailwind, hasRedux, hasRecoil, hasMobx, hasAxios, hasApollo }) => {
    let defaultState = hasRedux ? 'redux' : '';
    if (hasRecoil) {
      defaultState = 'recoil';
    } else if (hasMobx) {
      defaultState = 'mobx';
    }

    let defaultApi = hasAxios ? 'axios' : '';
    if (hasApollo) {
      defaultApi = 'apollo';
    }

    return [
      {
        type: 'input',
        name: 'project_name',
        message: 'Name of the project',
        default: projectName
      },
      {
        type: 'confirm',
        name: 'styled_components',
        message: 'Use styled components?',
        default: hasStyledComponents
      },
      {
        type: 'confirm',
        name: 'tailwind',
        message: 'Use tailwind?',
        default: hasTailwind
      },
      {
        type: 'list',
        name: 'state',
        message: 'Choose technology for accounts manager',
        choices: [
          { value: 'redux', name: 'Redux toolkit' },
          { value: 'recoil', name: 'Recoil' },
          { value: 'mobx', name: 'Mobx' }
        ],
        default: defaultState
      },
      {
        type: 'list',
        name: 'api',
        message: 'Choose technology for api calls',
        choices: [
          { value: 'axios', name: 'Axios (REST)' },
          { value: 'apollo', name: 'Apollo (GraphQL)', disabled: true }
        ],
        default: defaultApi
      }
    ];
  },
  exclude: [/^node_modules/, /^yarn.lock$/, /^_configs/],
  endCmd: (opts) => [
    { command: 'git', args: ['init'] },
    { command: 'yarn', args: ['install'] },
    { command: 'yarn', args: ['lint:fix'] },
    opts.update && { command: 'yarn', args: ['update', '-u'] },
    { command: 'git', args: ['add', '.'] },
    { command: 'git', args: ['commit', '-m', 'chore: initial commit'] },
    { command: 'yarn', args: ['install'] }
  ]
};

export default config;
