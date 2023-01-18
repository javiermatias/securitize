import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ExchangeRate } from '../../entities/Exchange-rate';
import { Wallet } from '../../entities/wallet';
import { WalletService } from '../../services/wallet.service';
import EditExchangeRate from '../exchange-rate/exchange-rate-edit';
import AddWallet from './add-wallet';
import SortSelect from './sort-select';
import WalletCard from './wallet-card';


const WalletContainer: React.FC<any> = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [sort, setSort] = useState('');
  const walletsService = new WalletService();

  useEffect(() => {
    const fetchData = async () => {
      const data = await walletsService.getWallets();
      setWallets(data);
    };
    fetchData();
  }, []);



  const handleSort = async (sortBy: string = sort) => {
    console.log("enter");
    switch (sortBy) {
      case "favorite":
        {
          const sortedWallets = await walletsService.getWalletsOrderBy(sortBy);
          setWallets(sortedWallets);
          break;
        }
      default:
        {
          const sortedWallets = await walletsService.getWallets();
          setWallets(sortedWallets);
          break;
        }
    }
    setSort(sortBy);

  };


  return (
    <div>
      <Container>
        <AddWallet onAdd={handleSort}></AddWallet>
        <Row>
          <Col xs={6} md={6} lg={3}>
            <SortSelect onSort={handleSort} />
          </Col>
          {/*      <Col xs={6} md={6} lg={{ span: 5, offset: 4 }}>
        <EditExchangeRate  />
        </Col> */}
        </Row>



        {wallets.map((wallet) => (
          <WalletCard key={wallet.address} address={wallet.address} balance={wallet.balance} favorite={wallet.favorite} old={wallet.old} />
        ))}
      </Container>
    </div>
  );
};

export default WalletContainer;





