import {
  Wallet,
  convertStringToHex,
  NFTokenMintFlags,
  NFTokenMint,
  Client,
} from 'xrpl';

import config from '../../../config';

export const nftCreate = async ({
  api,
  uri,
}: {
  api: Client;
  uri: string;
  flags?: number;
}) => {
  if (!config.wallet.secret) throw Error('Issuing wallet not found');
  try {
    let signer = Wallet.fromSecret(config.wallet.secret);

    let transaction: NFTokenMint = {
      TransactionType: 'NFTokenMint',
      Account: signer.classicAddress,
      NFTokenTaxon: 0,
      URI: convertStringToHex(uri),
    };

    transaction.TransferFee = 50;
    transaction.Flags =
      NFTokenMintFlags.tfBurnable + NFTokenMintFlags.tfTransferable;

    let hex_data = convertStringToHex(
      JSON.stringify({
        platform: 'TheBettermint',
        type: 'xrpl-mint-bot',
        gateway: 'https://ipfs.thebettermint.io',
      })
    );

    transaction.Memos = [
      {
        Memo: {
          MemoType:
            '687474703A2F2F6578616D706C652E636F6D2F6D656D6F2F67656E65726963',
          MemoData: hex_data,
        },
      },
    ];

    let opts = {
      autfill: false,
      failhard: true,
      wallet: signer,
    };

    let tx = await api.submitAndWait(transaction, opts);
    let hash = tx.result.hash;

    if (
      tx &&
      tx.result.meta &&
      typeof tx.result.meta !== 'string' &&
      tx.result.meta.AffectedNodes
    ) {
      let id = tx.result.meta.AffectedNodes.map((n: any) => {
        let data;
        let affNode = n;
        if (affNode.CreatedNode && affNode.CreatedNode.NewFields.NFTokens) {
          data = affNode.CreatedNode.NewFields.NFTokens.map((token: any) => {
            if (token.NFToken.URI == transaction.URI)
              return token.NFToken.NFTokenID;
          }).filter(Boolean);
        }

        if (affNode.ModifiedNode && affNode.ModifiedNode.FinalFields.NFTokens) {
          data = affNode.ModifiedNode.FinalFields.NFTokens.map((token: any) => {
            if (token.NFToken.URI == transaction.URI)
              return token.NFToken.NFTokenID;
          }).filter(Boolean);
        }

        return data;
      }).filter(Boolean);

      return [hash, id ? id[0][0] : null];
    }
    throw Error('Something went wrong during mint');
  } catch (error: any) {
    return Error(error.message);
  }
};
