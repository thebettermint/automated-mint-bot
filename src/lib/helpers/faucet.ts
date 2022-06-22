import axios from 'axios';
import { faucets } from '../constants/faucets';

export const generateFundedWallet = async (network: string) => {
  try {
    let url: string | undefined = faucets[network];
    if (!url) throw Error(`faucet not found for ${network}`);
    let response = await axios.post(url);
    return response;
  } catch (error: any) {
    return Error(error);
  }
};
