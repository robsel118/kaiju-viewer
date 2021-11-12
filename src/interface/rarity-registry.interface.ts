import { RarityConfig } from './rarity-config.interface';

export interface RarityRegistry {
  radioactive: RarityConfig;
  legendary: RarityConfig;
  epic: RarityConfig;
  rare: RarityConfig;
  uncommon: RarityConfig;
  common: RarityConfig;
}
