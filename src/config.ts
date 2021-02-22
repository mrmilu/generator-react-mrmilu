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
        message: 'Choose tecnology for state manager',
        choices: [
          { value: 'redux', name: 'Redux toolkit' },
          { value: 'recoil', name: 'Recoil' },
          { value: 'mobx', name: 'Mobx', disabled: true }
        ],
        default: defaultState
      },
      {
        type: 'list',
        name: 'api',
        message: 'Choose tecnology for api calls',
        choices: [
          { value: 'axios', name: 'Axios (REST)' },
          { value: 'apollo', name: 'Apollo (GraphQL)' }
        ],
        default: defaultApi
      }
    ];
  },
  exclude: [/^node_modules/, /^yarn.lock$/, /^_configs/],
  endCmd: ['git init', 'git add .', 'git commit -m "initial commit"', { cwd: '', cmd: 'ncu -u' }, 'yarn install']
};

export default config;
