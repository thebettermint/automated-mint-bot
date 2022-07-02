import {
  Wallet,
  NFTokenCreateOfferFlags,
  Client,
  NFTokenCreateOffer,
} from 'xrpl';
require('dotenv').config();

const key = process.env['ISSUER_SECRET'];

const nftTransfer = async ({
  api,
  destination,
  id,
}: {
  api: Client;
  destination: string;
  id: string;
}) => {
  let signer;
  if (key) signer = Wallet.fromSecret(key);
  if (!signer) throw Error;

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
  }).filter((item: any) => item != undefined);

  console.log(OfferId);

  return OfferId[0];
};

export default { nftTransfer };
