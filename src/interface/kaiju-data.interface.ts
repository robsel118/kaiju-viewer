import { Score } from './score.interface';
import { TraitMap } from './trait-map.interface';

export interface KaijuData {
  tokenId: number;
  name: string;
  description: string;
  traits: TraitMap[];
  traitCount: number;
  image: string;
  rank?: number;
  virtualRank?: number;
  score?: Score;
  expanded?: boolean;
}
