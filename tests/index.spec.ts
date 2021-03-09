import helpers, { RunResult } from 'yeoman-test';
import path from 'path';
import { exec } from 'child_process';

describe('Generator', () => {
  describe('Default generator', () => {
    let runResult: RunResult;
    const projectName = 'default-project';
    beforeAll((done) => {
      return helpers
        .run(path.join(__dirname, '../app'))
        .inDir(path.resolve(__dirname, 'apps/default'))
        .withArguments([projectName])
        .withOptions({ 'no-update': true })
        .then((result) => {
          runResult = result;
          done();
        });
    });
    it('Run test', (done) => {
      exec('yarn test', { cwd: path.resolve(runResult.cwd, projectName) }, (error, stdout, stderr) => {
        expect(error).toBeNull();
        expect(stdout).not.toBeNull();
        done();
      });
    });
  });
});
