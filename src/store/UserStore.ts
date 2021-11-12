import { ethers, Signer } from 'ethers';
import { action, extendObservable } from 'mobx';
import { wizardsAddress } from '../config/constants';
import { Wizards__factory } from '../contracts';
import { KaijuData } from '../interface/kaiju-data.interface';
import { RootStore } from './RootStore';

export class UserStore {
  private store: RootStore;
  public wallet?: Signer;
  public collection?: number[];
  public kaijus?: KaijuData[];
  public address?: string;
  public display?: number;

  constructor(store: RootStore) {
    this.store = store;

    extendObservable(this, {
      wallet: this.wallet,
      collection: this.collection,
      kaijus: this.kaijus,
      address: this.address,
    });

    this.connect();
  }

  connect = action(async (): Promise<void> => {
    if (this.wallet) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const app = window as any;
    if (app.ethereum) {
      const account = await app.ethereum.send('eth_requestAccounts');
      if (account) {
        const provider = new ethers.providers.Web3Provider(app.ethereum);
        this.wallet = await provider.getSigner();
        this.address = await this.wallet.getAddress();
        const wizardContract = Wizards__factory.connect(wizardsAddress, this.wallet);
        const wizardIds = await wizardContract.tokensOfOwner(this.address);
        this.collection = wizardIds.map((id) => Number(id.toString()));
        const collection = wizardIds.map((id) => id.toString());
        this.kaijus = collection
          .map((id) => this.store.ranks.kaijus[id])
          .sort((a, b) => {
            if (!a.rank || !b.rank) {
              return 0;
            }
            return a.rank - b.rank;
          });
        this.store.ranks.updateUserWizards();
      }
    }
  });

  updateWizards = action((kaijus: KaijuData[]): void => {
    this.kaijus = kaijus;
  });
}
