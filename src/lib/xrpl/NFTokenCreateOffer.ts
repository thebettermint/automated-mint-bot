import {
  Wallet,
  Client,
  NFTokenCreateOfferFlags,
  NFTokenCreateOffer,
} from 'xrpl';

import config from '../../../config';

export const nftTransfer = async ({
  api,
  destination,
  id,
}: {
  api: Client;
  destination: string;
  id: string;
}) => {
  if (!config.wallet.secret)
    throw Error('OfferCreate Error: Issuing wallet not found');
  try {
    let signer = Wallet.fromSecret(config.wallet.secret);

    let transaction: NFTokenCreateOffer = {
      TransactionType: 'NFTokenCreateOffer',
      Account: signer.classicAddress,
      Amount: '0',
      NFTokenID: id,
      Destination: destination,
      Flags: NFTokenCreateOfferFlags.tfSellNFToken,
    };

    let opts = {
      autfill: false,
      failhard: true,
      wallet: signer,
    };

    let tx: any = await api.submitAndWait(transaction, opts);

    let OfferId = tx.result.meta.AffectedNodes.map((n: any) => {
      let data;
      let affNode = n;
      if (
        affNode.CreatedNode &&
        affNode.CreatedNode.LedgerEntryType == 'NFTokenOffer'
      ) {
        data = affNode.CreatedNode.LedgerIndex;
      }
      return data;
    }).filter(Boolean);

    return OfferId[0];
  } catch (error: any) {
    throw Error(error.message);
  }
};
