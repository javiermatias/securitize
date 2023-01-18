import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ApiEthersService } from 'src/etherscan/api-ethers.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet, WalletDocument } from './schemas/wallet.schema';
import { Wallet as WalletEntity } from './entities/wallet.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name)
    private walletModel: Model<WalletDocument>,
    private readonly etherService: ApiEthersService,
  ) {}

  async create(createWalletDto: CreateWalletDto): Promise<WalletEntity> {
    const balance = await this.etherService.getBalance(createWalletDto.address);
    const firstTransaction =
      await this.etherService.getTimeStampFirstTransaction(
        createWalletDto.address,
      );
    const wallet = new WalletEntity(
      createWalletDto.address,
      balance,
      false,
      firstTransaction,
    );
    const modelWallet = new this.walletModel(wallet);
    await modelWallet.save();
    return wallet;
  }

  async findAll(): Promise<WalletEntity[]> {
    const listWallets = await this.walletModel.find().exec();
    const listMapped = listWallets.map(
      (doc) =>
        new WalletEntity(
          doc.address,
          doc.balance,
          doc.favorite,
          doc.firstTransaction,
        ),
    );

    return listMapped;
  }

  async findSort(sortBy: string): Promise<WalletEntity[]> {
    const sort = {};
    sort[sortBy] = -1;
    const listWallets = await this.walletModel.find().sort(sort).exec();
    const listMapped = listWallets.map(
      (doc) =>
        new WalletEntity(
          doc.address,
          doc.balance,
          doc.favorite,
          doc.firstTransaction,
        ),
    );

    return listMapped;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(updateWalletDto: UpdateWalletDto) {
    const address = updateWalletDto.address;
    return this.walletModel.updateOne(
      { address },
      { $set: { ...updateWalletDto } },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
