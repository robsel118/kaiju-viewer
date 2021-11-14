import kaijuList from '../data/kaijus.json';
import traitOccurences from '../data/traits.json';
import { FrequencyMap } from '../interface/frequency-map.interface';
import { KaijuMap } from '../interface/kaiju-map.interface';
import { KaijuSummary } from '../interface/kaiju-summary.interface';
import { TraitMap } from '../interface/trait-map.interface';
import { RootStore } from './RootStore';

export class KaijuStore {
  protected store: RootStore;
  public totalKaijus: number;
  public traitOccurences: FrequencyMap;
  public traitCounts: FrequencyMap;
  public kaijus: KaijuMap;
  public traitMap: TraitMap;

  constructor(store: RootStore) {
    this.store = store;
    const summary = this.evaluateSummary();
    this.totalKaijus = summary.totalKaijus;
    this.traitOccurences = summary.traitOccurences;
    this.traitCounts = summary.traitCounts;
    this.kaijus = summary.kaijus;
    this.traitMap = summary.traitMap;
  }

  private evaluateSummary(): KaijuSummary {
    const traitCounts: FrequencyMap = {};
    const traitLabels: string[] = [];
    const evaluateKaijus: KaijuMap = Object.fromEntries(
      kaijuList.map((kaiju) => {
        const { name, tokenId, attributes, image, description } = kaiju;
        const data = {
          name,
          tokenId,
          traits: attributes,
          traitCount: attributes.length,
          image,
          description,
        };
        traitLabels.push(...attributes.map((trait) => `${trait.trait_type}: ${trait.value}`));
        this.count(traitCounts, attributes.length);
        return [kaiju.tokenId, data];
      }),
    );
    return {
      traitOccurences,
      traitCounts: traitCounts,
      totalKaijus: kaijuList.length,
      traitMap: this.generateTraitMap(traitLabels),
      kaijus: evaluateKaijus,
    };
  }

  private count(map: FrequencyMap, key: string | number) {
    if (!map[key]) {
      map[key] = 0;
    }
    map[key] += 1;
  }
  private generateTraitMap(map: string[]) {
    const traitMap = {} as TraitMap;
    const uniqueTraitList = [...new Set(map)];
    uniqueTraitList.forEach((value, index) => {
      traitMap[index.toString()] = value;
    });

    return traitMap;
  }
}
