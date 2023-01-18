import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { WalletService } from '../../services/wallet.service';


const WalletDetail: React.FC<any> = ({ address, balance, favorite }) => {
 
    const [color, setColor] = useState(favorite ? "red" : "black");
    const walletsService = new WalletService();
    const handleClick = async () => {
        await walletsService.updateFavorite(address, color === "red" ? false : true);
        setColor(color === "red" ? "black" : "red");
    };

    return (
        <div className=' h-100'>

            <Card 
                className="mb-2 text-center h-100 radius-100"
            >
         
                <Card.Body>
                <FontAwesomeIcon
                        icon={faHeart}
                        className="float-right ml-auto"
                        style={{ color: color, cursor: 'pointer' }}
                        onClick={handleClick}   
                    />
                    <Card.Text>
                      Address:{address}
                    </Card.Text>

                    <Card.Text>
                        Balance: {balance}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default WalletDetail;