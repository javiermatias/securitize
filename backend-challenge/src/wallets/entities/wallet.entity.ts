export class Wallet {
  private address: string;

  private balance: string;

  private favorite: boolean;

  private firstTransaction: number; //timeStamp

  private old: boolean;

  constructor(
    address: string,
    balance: string,
    favorite: boolean,
    firstTransaction: number,
  ) {
    this.address = address;
    this.balance = balance;
    this.favorite = favorite;
    this.firstTransaction = firstTransaction;
    this.old = this.setOld(firstTransaction);
  }

  public setOld(firstTransaction: number) {
    if (firstTransaction == 0) return false;
    const today = new Date();
    const timestamp = new Date(firstTransaction * 1000);
    const daysPassed = Math.ceil(
      (today.getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24),
    );
    return daysPassed > 365;
  }
}
