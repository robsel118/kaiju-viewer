import { KaijuMap2 } from './kaiju-map-2.interface';
import { TraitAffinityMap } from './trait-affinity-map.interface';
import { TraitMap } from './trait-map.interface';

export interface WizardSummary2 {
  wizards: KaijuMap2;
  traits: TraitAffinityMap;
  traitMap: TraitMap;
}
