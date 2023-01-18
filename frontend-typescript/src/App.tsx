import React from 'react';
import logo from './logo.svg';
import './App.css';

import WalletContainer from './components/wallet/wallet-container';

import { Home } from './components/home';
import AddWallet from './components/wallet/add-wallet';
import { Container } from 'react-bootstrap';
import ExchangeRatesFetcher from './components/exchange-rate/exchange-rate.context';


function App() {

  return (
    
    <div>
  < Container>
    <ExchangeRatesFetcher></ExchangeRatesFetcher>      
   </Container>

    </div>
  );




  

}

export default App;
