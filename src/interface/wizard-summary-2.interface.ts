import { TraitAffinityMap } from './trait-affinity-map.interface';
import { TraitMap } from './trait-map.interface';
import { KaijuMap2 } from './wizard-map-2.interface';

export interface WizardSummary2 {
  wizards: KaijuMap2;
  traits: TraitAffinityMap;
  traitMap: TraitMap;
}
