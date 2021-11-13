import kaijuList from '../data/kaijus.json';
import traitOccurence from '../data/traits.json';
import { FrequencyMap } from '../interface/frequency-map.interface';
import { KaijuMap } from '../interface/kaiju-map.interface';
import { KaijuSummary } from '../interface/kaiju-summary.interface';
import { NestedFrequencyMap } from '../interface/nested-frequency-map.interface';
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
    const traitOccurences: FrequencyMap = {};

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
        this.count(traitCounts, attributes.length);
        return [kaiju.tokenId, data];
      }),
    );

    Object.values(traitOccurence).reduce((acc, trait) => {
      Object.entries(trait).forEach(([key, value]) => {
        acc[key] = value;
      });
      return acc;
    }, traitOccurences);
    return {
      traitOccurences,
      traitCounts: traitCounts,
      totalKaijus: kaijuList.length,
      traitMap: this.generateTraitMap(traitOccurence),
      kaijus: evaluateKaijus,
    };
  }

  private count(map: FrequencyMap, key: string | number) {
    if (!map[key]) {
      map[key] = 0;
    }
    map[key] += 1;
  }
  private generateTraitMap(map: NestedFrequencyMap) {
    const traitMap = {} as TraitMap;
    let index = 0;
    for (const [key, value] of Object.entries(map)) {
      for (const keyValue of Object.keys(value)) {
        traitMap[(index++).toString()] = `${key}: ${keyValue}`;
      }
    }
    return traitMap;
  }
}
