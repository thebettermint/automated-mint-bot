import {
  Wallet,
  Client,
  NFTokenCreateOfferFlags,
  NFTokenCreateOffer,
} from 'xrpl';

import env from '../helpers/env';

const key = env['ISSUER_SECRET'];

export const nftTransfer = async ({
  api,
  destination,
  id,
}: {
  api: Client;
  destination: string;
  id: string;
}) => {
  if (!key) return;
  try {
    let signer = Wallet.fromSecret(key);

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
    return Error(error.message);
  }
};
