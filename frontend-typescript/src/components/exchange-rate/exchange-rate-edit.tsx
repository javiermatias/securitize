import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ExchangeRatesContext } from './exchange-rate.context';

const EditExchangeRate: React.FC<any> = () => {
    const exchangeRates = useContext(ExchangeRatesContext);
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [selectedRate, setSelectedRate] = useState(0);
    const [rate, setRate] = useState(0);

    useEffect(() => {
        if (exchangeRates.length > 0) {

            setSelectedCurrency(exchangeRates[0].currency);
            setSelectedRate(exchangeRates[0].rate);
        }
    }, [exchangeRates]);

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(event.target.value);
    };

    const handleRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRate(parseFloat(event.target.value));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        //onSubmit(rate, selectedCurrency);
    };

    return (
        <Form className="d-flex justify-content-end align-items-center aling-content-center ml-auto p-2 bg-warning" onSubmit={handleSubmit}>
            <Form.Group className="mt-4 w-100 h-100  d-flex justify-content-end align-items-end flex-column ml-auto p-2 bg-primary" controlId="currencySelect">
                <Form.Label>Currency</Form.Label>
                <Form.Select className="w-50" value={selectedCurrency} onChange={handleCurrencyChange}>
                    {exchangeRates.map(rate => (
                        <option key={rate.currency} value={rate.currency}>
                            {rate.currency}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mt-4 w-100 d-flex justify-content-end align-items-end flex-column ml-auto p-2 bg-primary" controlId="rateInput">
                <Form.Label>Rate</Form.Label>
                <Form.Control className="w-50" type="number" value={rate} onChange={handleRateChange} />
            </Form.Group>
            <div className='mt-5 w-100 h-100 d-flex justify-content-center align-items-end aling-content-end ml-auto p-2 bg-danger'>
                <Button className=" h-100 w-100   " variant="primary" type="submit">
                    Submit
                </Button>
            </div>
        </Form>
    );
};

export default EditExchangeRate;