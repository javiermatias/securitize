import React, { useContext, useEffect, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { ExchangeRatesContext } from './exchange-rate.context';

interface Props {
    balance: number;

}


const ExchangeDetail: React.FC<Props> = ({ balance }) => {
    const exchangeRates = useContext(ExchangeRatesContext);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [convertedBalance, setConvertedBalance] = useState(0);

    useEffect(() => {
        if (exchangeRates.length > 0) {

            setSelectedCurrency(exchangeRates[0].currency);
            setConvertedBalance(balance * exchangeRates[0].rate);
        }
    }, [exchangeRates, balance]);

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        const selectedExchangeRate = exchangeRates.find((rate: { currency: string; }) => rate.currency === selected);
        if (selectedExchangeRate) {
            setSelectedCurrency(selected);
            setConvertedBalance(+((balance * selectedExchangeRate.rate).toFixed(2)));
        }
    };


    return (
        <div>

            <Card
                className=" text-center h-100 b">

                <Card.Body className="h-100">

                    <Form.Label> Select Currency</Form.Label>
                    <Form.Select value={selectedCurrency} onChange={handleCurrencyChange}>
                        {exchangeRates.map(rate => (
                            <option key={rate.currency} value={rate.currency}>
                                {rate.currency}
                            </option>
                        ))}
                    </Form.Select>

                    <p>Balance: {convertedBalance} {selectedCurrency}</p>
                </Card.Body>
            </Card>
        </div >




    );
};

export default ExchangeDetail;