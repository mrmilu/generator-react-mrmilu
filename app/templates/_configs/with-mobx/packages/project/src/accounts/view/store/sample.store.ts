import type { RootStore } from '../../../common/view/store/root.store';
import { action, computed, makeObservable, observable } from 'mobx';
import { timeoutPromise } from '../../../common/utils/promise';
import type { NestedSampleState } from './sample.types';

const DEFAULT_SAMPLE_NAME = 'sample item';
const defaultNestedSampleState = (): NestedSampleState => ({
  sampleUnits: 33,
  sampleNotInitialized: undefined
});

export class SampleStore {
  rootStore: RootStore;
  // State
  sampleName = DEFAULT_SAMPLE_NAME;
  nestedSample = defaultNestedSampleState();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore; // this way we can access different stores if necessary
    makeObservable(this, {
      sampleName: observable,
      nestedSample: observable.deep,
      setSample: action,
      setSampleName: action,
      resetConfiguration: action,
      sampleUnits: computed
    });
  }

  get sampleUnits(): number {
    return this.nestedSample.sampleUnits;
  }

  setSample({ sampleName, ...restSample }: NestedSampleState & { sampleName: string }) {
    this.sampleName = sampleName;
    this.nestedSample = { ...this.nestedSample, ...restSample };
  }

  setSampleName(value: string) {
    this.sampleName = value;
  }

  resetConfiguration() {
    this.sampleName = DEFAULT_SAMPLE_NAME;
    this.nestedSample = defaultNestedSampleState();
  }

  async sampleAsyncAction(sampleName: string) {
    this.setSampleName(sampleName);
    await timeoutPromise(5000);
    this.setSampleName('sample item');
    // eslint-disable-next-line no-console
    console.log('thunk finish');
  }
}
