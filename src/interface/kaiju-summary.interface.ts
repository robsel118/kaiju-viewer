import { AffinityMap } from './affinity-map.interface';
import { FrequencyMap } from './frequency-map.interface';
import { KaijuMap } from './kaiju-map.interface';
import { TraitAffinityMap } from './trait-affinity-map.interface';
import { TraitMap } from './trait-map.interface';
export interface WizardSummary {
  traitCounts: FrequencyMap;
  traitOccurences: FrequencyMap;
  affinityOccurences: FrequencyMap;
  kaijus: KaijuMap;
  totalKaijus: number;
  affinityToTraits: AffinityMap;
  traitsToAffinity: TraitAffinityMap;
  traitMap: TraitMap;
}
