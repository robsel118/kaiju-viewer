import { createMuiTheme } from '@material-ui/core/styles';
import { rarityRegistry } from './config/constants';
import KaijuFont from './fonts/KaijuKingz.ttf';
import { CollectionInfo } from './interface/collection-info.interface';
import { OpenseaResponse } from './interface/opensea-response.interface';
import { RarityConfig } from './interface/rarity-config.interface';

const kaijuKingWeb = {
  fontFamily: 'KaijuKingz',
  fontStyle: 'semi-bold',
  fontDisplay: 'swap',
  fontWeight: '400',
  src: `
    local('Kaiju-Kingz'),
    url(${KaijuFont}) format('truetype')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;',
} as const;

const openseaGraphUrl = 'https://api.opensea.io/graphql/';
const kaijuQuery = {
  id: 'collectionQuery',
  query:
    'query collectionQuery(\n  $collection: CollectionSlug!\n) {\n  collection(collection: $collection) {\n    bannerImageUrl\n    name\n    description\n    imageUrl\n    ...CollectionHeader_data\n    id\n  }\n}\n\nfragment CollectionHeader_data on CollectionType {\n  name\n  description\n  imageUrl\n  bannerImageUrl\n  ...CollectionStatsBar_data\n  ...SocialBar_data\n  ...verification_data\n}\n\nfragment CollectionStatsBar_data on CollectionType {\n  stats {\n    averagePrice\n    numOwners\n    totalSupply\n    totalVolume\n    id\n  }\n  slug\n}\n\nfragment SocialBar_data on CollectionType {\n  discordUrl\n  externalUrl\n  instagramUsername\n  isEditable\n  mediumUsername\n  slug\n  telegramUrl\n  twitterUsername\n}\n\nfragment verification_data on CollectionType {\n  isMintable\n  isSafelisted\n  isVerified\n}\n',
  variables: {
    collection: 'kaiju-kingz',
  },
};

export const viewerTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#859d92',
      main: '#1c3b4b',
      dark: '#1c3b4b',
      contrastText: '#000',
    },
    secondary: {
      light: '#ff7961',
      main: '#f841b3',
      dark: '#6ca0dc',
      contrastText: '#000',
    },
    background: {
      paper: '#1c3b4b',
    },
    text: {
      primary: '#FFF',
      secondary: '#FFF',
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'KaijuKingz'].join(', '),
    fontSize: 14,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [kaijuKingWeb],
      },
    },
  },
});

export async function getKaijuData(): Promise<CollectionInfo | undefined> {
  const response = await fetch(openseaGraphUrl, {
    method: 'POST',
    body: JSON.stringify(kaijuQuery),
  });
  if (!response.ok) {
    return;
  }
  const openseaResponse: OpenseaResponse = await response.json();
  return openseaResponse.data.collection;
}

function getRarityConfig(rarity: number, getCutoff: (config: RarityConfig) => number): RarityConfig {
  const rarityConfigs: RarityConfig[] = Object.values(rarityRegistry);
  for (const config of rarityConfigs) {
    if (getCutoff(config) / 3333 >= rarity) {
      return config;
    }
  }
  return rarityRegistry.common;
}

export function getRarityDescriptor(rarity: number): string {
  return getRarityConfig(rarity, (config) => config.cutoff).name;
}

export function getAffinityRarityDescriptor(rarity: number): string {
  return getRarityConfig(rarity, (config) => config.affinityCutoff).name;
}

export function getRarityColor(rarity: number): string {
  return getRarityConfig(rarity, (config) => config.cutoff).color;
}

export function getAffinityRarityColor(rarity: number): string {
  return getRarityConfig(rarity, (config) => config.affinityCutoff).color;
}
