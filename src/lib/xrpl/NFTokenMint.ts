import {
  Wallet,
  convertStringToHex,
  NFTokenMintFlags,
  Client,
  NFTokenMint,
} from 'xrpl';
require('dotenv').config();

const key = process.env['ISSUER_SECRET'];

const nftMint = async ({
  api,
  uri,
}: {
  api: Client;
  uri: string;
  flags: number;
}) => {
  let signer;
  if (key) signer = Wallet.fromSecret(key);
  if (!signer) throw Error;

  let transaction: NFTokenMint = {
    TransactionType: 'NFTokenMint',
    Account: signer.classicAddress,
    NFTokenTaxon: 0,
    URI: convertStringToHex(uri),
  };

  transaction.TransferFee = 50;
  transaction.Flags =
    NFTokenMintFlags.tfBurnable & NFTokenMintFlags.tfTransferable;

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

  let tx: any = await api.submitAndWait(transaction, opts);
  let hash = tx.result.hash;

  let id = tx.result.meta.AffectedNodes.map((n: any) => {
    let data;
    let affNode = n;
    if (
      affNode.CreatedNode &&
      affNode.CreatedNode.NewFields.NonFungibleTokens
    ) {
      data = affNode.CreatedNode.NewFields.NonFungibleTokens.map(
        (token: any) => {
          if (token.NonFungibleToken.URI == transaction.URI)
            return token.NonFungibleToken.TokenID;
        }
      ).filter((item: any) => item != undefined);
    }

    if (
      affNode.ModifiedNode &&
      affNode.ModifiedNode.FinalFields.NonFungibleTokens
    ) {
      data = affNode.ModifiedNode.FinalFields.NonFungibleTokens.map(
        (token: any) => {
          if (token.NonFungibleToken.URI == transaction.URI)
            return token.NonFungibleToken.TokenID;
        }
      ).filter((item: any) => item != undefined);
    }

    return data;
  }).filter((item: any) => item != undefined);

  console.log(id[0][0]);
  console.log(hash);

  return [hash, id[0][0]];
};

export default { nftMint };
