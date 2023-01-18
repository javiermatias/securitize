import axios from "axios";
import { Wallet } from "../entities/wallet";
import { ethers } from "ethers";
import { ExchangeRate } from "../entities/Exchange-rate";

const API_URL = "http://localhost:3001";//do it by .env

export class WalletService {

    async getWallets(): Promise<Wallet[]> {

        try {
            const response = await axios.get(`${API_URL}/wallets`);
            let data: Wallet[] = response.data.map((x: any) => {

                return {
                    address: x.address,
                    balance: this.toFixed(parseFloat(ethers.utils.formatEther(x.balance)), 2),
                    favorite: x.favorite,
                    firstTransaction: x.firstTransaction,
                    old: x.old
                }

            })

            return data;

        } catch (error) {
            //could be log
            throw error;
        }
    }

    async getWalletsOrderBy(order: string): Promise<Wallet[]> {

        try {
            const response = await axios.get(`${API_URL}/wallets?sortBy=${order}`);
            let data: Wallet[] = response.data.map((x: any) => {

                return {
                    address: x.address,
                    balance: this.toFixed(parseFloat(ethers.utils.formatEther(x.balance)), 2), //wei to ethers could be do it in the back
                    favorite: x.favorite,
                    firstTransaction: x.firstTransaction,
                    old: x.old
                }

            })

            return data;
        } catch (error) {
            //could be log
            throw error;
        }
    }


    async createWallet(address: string) {
        try {
            const response = await axios.post(`${API_URL}/wallets`, { address });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateFavorite(address: string, favorite: boolean) {
        try {
            const response = await axios.patch(`${API_URL}/wallets`, { address, favorite });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    toFixed(num: number, fixed: number) {
        fixed = fixed || 0;
        fixed = Math.pow(10, fixed);
        return Math.floor(num * fixed) / fixed;
    }

    async getExchangeRates(): Promise<ExchangeRate[]> {

        try {
            const response = await axios.get(`${API_URL}/exchange-rates`);
            return response.data;
        } catch (error) {
            //could be log
            throw error;
        }
    }
}


