import React, { useState } from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { Wallet } from '../../entities/wallet';
import ExchangeDetail from '../exchange-rate/exchange-details';
import WalletDetail from './wallet-detail';


const WalletCard: React.FC<Wallet> = ({ address, balance, favorite, old }) => {
    return (
        <div>

            <Row>
                <Col xs={12}>
                    {old ? <Alert variant="danger" className="mt-4 py-2">
                        The wallet is old!
                    </Alert> : <div style={{ height: '30px' }} />}
                </Col>
            </Row>
            <Row>

                <Col xs={6} md={6}>
                    <WalletDetail address={address} balance={balance} favorite={favorite}></WalletDetail>
                </Col>
                <Col xs={6} md={6}>
                    <ExchangeDetail balance={balance}></ExchangeDetail>
                </Col>
            </Row>


        </div>
    );
};

export default WalletCard;
