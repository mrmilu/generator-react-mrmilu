import { SampleStore } from '../../../accounts/view/store/sample.store';
import { createContext } from 'react';

export class RootStore {
  sampleStore: SampleStore;

  constructor() {
    this.sampleStore = new SampleStore(this);
  }
}

export const StoreContext = createContext<RootStore>({} as RootStore);
