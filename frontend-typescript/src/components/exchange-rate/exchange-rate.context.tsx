import { createContext, useEffect, useState } from "react";
import { ExchangeRate } from "../../entities/Exchange-rate";
import { WalletService } from "../../services/wallet.service";
import WalletContainer from "../wallet/wallet-container";


// Create a context to store the exchange rates
export const ExchangeRatesContext = createContext<ExchangeRate[]>([]);

const ExchangeRatesFetcher: React.FC = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const walletsService = new WalletService();
  useEffect(() => {
    const fetchData = async () => {
      const data = await walletsService.getExchangeRates();
      setExchangeRates(data);
    };
    fetchData();
  }, []);

  return (
    <ExchangeRatesContext.Provider value={exchangeRates}>
      <WalletContainer></WalletContainer>
    </ExchangeRatesContext.Provider>
  );
};

export default ExchangeRatesFetcher;