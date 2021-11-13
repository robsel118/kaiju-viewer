import { action, extendObservable } from 'mobx';

export class StateStore {
  public showFilter = true;
  public kaiju?: number;
  public affinity?: number;
  public trait?: number;

  constructor() {
    extendObservable(this, {
      showFilter: this.showFilter,
      kaiju: this.kaiju,
      affinity: this.affinity,
      trait: this.trait,
    });
  }

  setShowFilter = action((showFilter: boolean) => (this.showFilter = showFilter));

  setKaiju = action((kaiju?: number) => {
    if (this.kaiju === kaiju) {
      this.kaiju = undefined;
    } else {
      this.kaiju = kaiju;
    }
  });

  setAffinity = action((affinity: number) => (this.affinity = affinity));

  setTrait = action((trait: number) => (this.trait = trait));
}
