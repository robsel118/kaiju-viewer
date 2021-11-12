import { RarityRegistry } from '../interface/rarity-registry.interface';

export const baseUrl = 'https://opensea.io/assets/0x0c2e57efddba8c768147d1fdf9176a0a6ebd5d83/';
export const ref = '';
export const wizardsAddress = '0x0c2e57efddba8c768147d1fdf9176a0a6ebd5d83';

export const rarityRegistry: RarityRegistry = {
  radioactive: {
    color: '#e6cc80',
    cutoff: 1,
    affinityCutoff: 1,
    name: 'Radioactive',
  },
  legendary: {
    color: '#ff8000',
    cutoff: 25,
    affinityCutoff: 200,
    name: 'Legendary',
  },
  epic: {
    color: '#a335ee',
    cutoff: 75,
    affinityCutoff: 1500,
    name: 'Epic',
  },
  rare: {
    color: '#0070dd',
    cutoff: 175,
    affinityCutoff: 4500,
    name: 'Rare',
  },
  uncommon: {
    color: '#1eff00',
    cutoff: 275,
    affinityCutoff: 8800,
    name: 'Uncommon',
  },
  common: {
    color: '#fff',
    cutoff: 3333,
    affinityCutoff: 20000,
    name: 'Common',
  },
};
