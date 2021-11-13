import { FrequencyMap } from './frequency-map.interface';
import { KaijuMap } from './kaiju-map.interface';
import { TraitMap } from './trait-map.interface';
export interface KaijuSummary {
  traitCounts: FrequencyMap;
  traitOccurences: FrequencyMap;
  kaijus: KaijuMap;
  totalKaijus: number;
  traitMap: TraitMap;
}
