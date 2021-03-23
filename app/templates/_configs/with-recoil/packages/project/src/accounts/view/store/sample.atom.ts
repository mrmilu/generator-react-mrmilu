import { atom, DefaultValue, selector } from 'recoil';
import type { SampleState } from './sample.types';

export const INITIAL_STATE: SampleState = {
  sampleName: 'sample item',
  sampleUnits: 33
};

export const sampleState = atom({
  key: 'sampleState',
  default: INITIAL_STATE
});

export const sampleName = selector<string>({
  key: 'sampleName',
  get: ({ get }) => {
    const sample = get(sampleState);
    return sample.sampleName;
  },
  set: ({ set, get }, newValue) => {
    const sample = get(sampleState);
    const newState = newValue instanceof DefaultValue ? newValue : { ...sample, sampleName: newValue };
    set(sampleState, newState);
  }
});
