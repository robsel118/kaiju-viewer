import kaijuList from '../data/kaijus.json';
import traitOccurence from '../data/traits.json';
import { AffinityMap } from '../interface/affinity-map.interface';
import { FrequencyMap } from '../interface/frequency-map.interface';
import { KaijuData } from '../interface/kaiju-data.interface';
import { NestedFrequencyMap } from '../interface/nested-frequency-map.interface';
import { TraitAffinityMap } from '../interface/trait-affinity-map.interface';
import { TraitMap } from '../interface/trait-map.interface';
import { KaijuMap } from '../interface/wizard-map.interface';
import { WizardSummary } from '../interface/wizard-summary.interface';
import { RootStore } from './RootStore';

export class KaijuStore {
  protected store: RootStore;
  public totalKaijus: number;
  public traitOccurences: FrequencyMap;
  public traitCounts: FrequencyMap;
  public affinityOccurences: FrequencyMap;
  public wizards: KaijuMap;
  public traitMap: TraitMap;
  public traitsToAffinity: TraitAffinityMap;
  public affinityToTraits: AffinityMap;

  constructor(store: RootStore) {
    this.store = store;
    const summary = this.evaluateSummary();
    this.totalKaijus = summary.totalKaijus;
    this.traitOccurences = summary.traitOccurences;
    this.traitCounts = summary.traitCounts;
    this.affinityOccurences = summary.affinityOccurences;
    this.wizards = summary.wizards;
    this.traitMap = summary.traitMap;
    this.traitsToAffinity = summary.traitsToAffinity;
    this.affinityToTraits = summary.affinityToTraits;
  }

  private evaluateSummary(): WizardSummary {
    const affinityToTraits: AffinityMap = {};
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
      affinityOccurences: {},
      traitsToAffinity: {},
      affinityToTraits,
      wizards: evaluateKaijus,
      kaijus: evaluateKaijus,
    };
  }

  randomWizard(): KaijuData {
    const wizardType = this.randomItem([
      'Black Mage',
      'Blue Mage',
      'Summoner',
      'Warlock',
      'White Mage',
      'Time Mage',
      'Evoker',
      'Conjurer',
      'Enchanter',
      'Acolyte',
      'High Magus',
    ]);
    const wizardName = this.randomItem([
      'Jintao',
      'Madness',
      'Larry',
      'Wilt',
      'Shual',
      'Sifu',
      'Creat0r',
      'Yyc',
      'Jrrrrrr',
      'TV',
      'Dpit',
      'Madotsuki',
      'popular',
      'bread',
      'rawdawg',
    ]);
    const suffix = this.randomItem([
      '',
      ' of the Four Winds',
      ", Hand of A'dal",
      ', Slayer of Stupid, Incompetent and Disappointing Minions',
      ' the Immortal',
      ", Winter's Envoy",
      ' the Faceless One',
      ' the Astral Walker',
      ' of the Black Harvest',
      ', No Good, Dirty, Rotten, Candy Stealer!',
      ' the Awakened',
      ' the Crazy Cat Man',
      ' the Love Fool',
      ' the Stormbreaker',
    ]);
    const name = `${wizardType} ${wizardName}${suffix}`;
    const traitCount = this.randomItem([3, 4, 5, 6]);

    // traits
    const wizardTraits: TraitMap = {};
    const checkTrait = (entry: string[], expected: string): boolean => {
      const traitType = entry[1].split(': ')[0];
      return traitType === expected;
    };
    const pickTrait = (filter: string): void => {
      const traits = Object.fromEntries(Object.entries(this.traitMap).filter((e) => checkTrait(e, filter)));
      const key = this.randomItem(Object.keys(traits));
      wizardTraits[key] = traits[key];
    };

    pickTrait('background');
    pickTrait('head');
    pickTrait('body');
    if (traitCount > 3) {
      pickTrait('prop');
    }
    if (traitCount > 4) {
      pickTrait('rune');
    }
    if (traitCount > 5) {
      pickTrait('familiar');
    }

    return {
      tokenId: 10001,
      rank: 10001,
      score: {
        trait: 0,
        total: 0,
      },
      name,
      traitCount,
      traits: [],
      image: '',
      description: '',
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
  private randomItem<T>(items: T[]): T {
    return items[Math.floor(Math.random() * items.length)];
  }
}
