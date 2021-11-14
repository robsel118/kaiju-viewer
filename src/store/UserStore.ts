import { ethers, Signer } from 'ethers';
import { action, extendObservable } from 'mobx';
import { wizardsAddress } from '../config/constants';
import { Kaijus__factory } from '../contracts';
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
        if (this.address && this.wallet) {
          const kaijuContract = Kaijus__factory.connect(wizardsAddress, this.wallet);
          const kaijuIds = await kaijuContract.walletOfOwner(this.address);
          this.collection = kaijuIds.map((id) => Number(id.toString()));
          const collection = kaijuIds.map((id) => id.toString());
          this.kaijus = collection
            .map((id) => this.store.ranks.kaijus[id])
            .sort((a, b) => {
              if (!a.rank || !b.rank) {
                return 0;
              }
              return a.rank - b.rank;
            });
          this.store.ranks.updateUserKaijus();
        }
      }
    }
  });

  updateKaijus = action((kaijus: KaijuData[]): void => {
    this.kaijus = kaijus;
  });
}
