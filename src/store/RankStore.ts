import { action, extendObservable, IObjectDidChange, observe } from 'mobx';
import { KaijuData } from '../interface/kaiju-data.interface';
import { Score } from '../interface/score.interface';
import { ScoreStats } from '../interface/score-stats.interface';
import { KaijuStore } from './KaijuStore';
import { RootStore } from './RootStore';

export class RankStore extends KaijuStore {
  public scoreStats: ScoreStats;
  public ranking: KaijuData[];
  public customRanking: KaijuData[];
  public custom = true;
  public showUser = false;
  public maxAffinity = false;
  public maxPercent = false;
  public filter?: string;

  constructor(store: RootStore) {
    super(store);
    const counts = Object.values(this.traitOccurences).map((count) => count / this.totalKaijus);
    const primaryRarities = Object.values(this.wizards).map((kaiju) => this.getTraitsRarity(kaiju, true));
    const secondaryRarities = Object.values(this.wizards).map((kaiju) => this.getTraitsRarity(kaiju, false));
    const compositeRarities = Object.values(this.wizards).map((kaiju) =>
      Math.pow(this.getTraitsRarity(kaiju, true) * this.getTraitsRarity(kaiju, false), 0.01),
    );
    this.scoreStats = {
      minTraitCountRarity: Math.min(...counts),
      maxTraitCountRarity: Math.max(...counts),
      minTraitRarity: Math.min(...compositeRarities),
      maxTraitRarity: Math.max(...compositeRarities),
      minPrimarityTraitRarity: Math.min(...primaryRarities),
      maxPrimarityTraitRarity: Math.max(...primaryRarities),
      minSecondaryTraitRarity: Math.min(...secondaryRarities),
      maxSecondaryTraitRarity: Math.max(...secondaryRarities),
    };
    this.customRanking = this.evaluateRank();
    this.custom = false;
    this.ranking = this.evaluateRank();
    this.updateUserWizards();

    const rankObeserver = extendObservable(this, {
      ranking: this.ranking,
      custom: this.custom,
      filter: this.filter,
      showUser: this.showUser,
      maxAffinity: this.maxAffinity,
      maxPercent: this.maxPercent,
    });

    observe(rankObeserver, (change: IObjectDidChange) => {
      if (change.name === 'custom') {
        this.updateUserWizards();
      }
    });
  }

  updateUserWizards() {
    const ranking = this.custom ? this.customRanking : this.ranking;
    const wizards = this.store.user.wizards ?? [];
    const userWizards = new Set(wizards.map((kaiju) => kaiju.tokenId));
    this.store.user.wizards = ranking.filter((kaiju) => userWizards.has(kaiju.tokenId));
  }

  get displayRanking(): KaijuData[] {
    return this.custom ? this.customRanking : this.ranking;
  }

  get searchOptions(): string[] {
    const traits = Object.entries(this.traitMap)
      .filter((trait) => this.traitMap[trait[0]])
      .map((e) => e[1]);
    const traitCounts = Object.keys(this.traitCounts).map((key) => `${key} traits`);
    return [...new Set([...traits, ...traitCounts])];
  }

  get display(): KaijuData[] {
    let displayList: KaijuData[] = [];
    const { wizards } = this.store.user;
    if (this.showUser) {
      displayList = wizards ? wizards : [];
    } else {
      displayList = this.custom ? this.customRanking : this.ranking;
    }
    return displayList.filter((kaiju) => {
      if (!this.filter) {
        return true;
      }

      const localFilter = this.filter;

      // match exact words / partials
      const nameMatch = kaiju.name.toLowerCase().includes(localFilter);
      const traitMatch = kaiju.traits.some((trait) => trait.value.toLowerCase().includes(localFilter.split(': ')[1]));

      // match ranking / serial number look ups
      let serialMatch = false;
      let rankMatch = false;
      if (!isNaN(parseFloat(localFilter))) {
        const numericFilter = Number(localFilter);
        serialMatch = Number(kaiju.tokenId) === numericFilter;
        rankMatch = kaiju.rank === numericFilter;
      }

      // match trait count look up
      let traitCountMatches = false;
      try {
        const [traitCount, maybeTraits] = localFilter.split(' ');
        if (!isNaN(parseFloat(traitCount)) && maybeTraits.toLowerCase() === 'traits') {
          traitCountMatches = kaiju.traitCount === Number(traitCount);
        }
      } catch {}

      return nameMatch || traitMatch || rankMatch || serialMatch || traitCountMatches;
    });
  }

  evaluateRank(): KaijuData[] {
    const wizards: KaijuData[] = JSON.parse(JSON.stringify(Object.values(this.wizards)));
    return wizards
      .sort((a, b) => this.score(b).total - this.score(a).total)
      .map((w, i) => {
        w.rank = i + 1;
        w.score = this.score(w);
        return w;
      });
  }

  private getTraitsRarity(kaiju: KaijuData, primary: boolean): number {
    const traits = kaiju.traits.map((trait) => this.getRarity(trait.value.toLowerCase())).sort((a, b) => a - b);
    let evaluated: number[] = [];
    if (primary) {
      evaluated = traits.slice(0, 3);
    } else {
      evaluated = traits.slice(3);
    }
    return evaluated.reduce((total, value) => (total *= value), 1);
  }

  score(kaiju: KaijuData): Score {
    const trait = 0;
    const total = kaiju.traits.reduce((score, trait) => {
      if (trait.trait_type === 'Origin') {
        return score;
      } else {
        return score + 1 / this.getRarityOccurence(trait.value.toLowerCase()) / this.totalKaijus;
      }
    }, 0);

    return { trait, total };
  }

  getRarity(trait: string): number {
    return this.getRarityOccurence(trait) / this.totalKaijus;
  }

  getRarityOccurence(trait: string) {
    return this.traitOccurences[trait.toLowerCase()];
  }

  getCountRarity(count: number): number {
    return this.traitCounts[count] / this.totalKaijus;
  }

  toggleCustom = action(() => {
    this.custom = !this.custom;
  });

  toggleMaxAffinity = action(() => {
    this.maxAffinity = !this.maxAffinity;
  });

  toggleMaxPercent = action(() => {
    this.maxPercent = !this.maxPercent;
  });

  setShowUser = action((showUser: boolean) => {
    if (this.showUser === showUser) {
      return;
    }
    this.showUser = showUser;
  });

  search = action((filter?: string) => {
    this.store.state.setWizard(undefined);
    this.filter = filter;
  });
}
