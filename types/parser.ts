import { TxResponse, TransactionStream, TransactionEntryResponse } from 'xrpl';

export type modTxResponse = TxResponse;

export type modTransactionStream = TransactionStream;

export type modTransactionEntryResponse = TransactionEntryResponse;

export type TxParserInterface =
  | modTxResponse
  | modTransactionStream
  | modTransactionEntryResponse;

export interface PaymentInterface extends Object {
  source: string;
  destination: string;
  source_balance_changes: {
    currency: string;
    value: string;
    counterparty: string;
  }[];
  destination_balance_changes: {
    currency: string;
    value: string;
    counterparty: string;
  }[];
  currency?: string;
  amount?: string;
  destination_tag?: number;
  source_tag?: number;
  invoice_id?: string;
  delivered_amount?: string;
  max_amount?: string;
  source_currency?: string;
  issuer?: string;
  fee?: string;
  ledger_index?: number;
  tx_index?: number;
  time: number;
  tx_hash: string;
  client?: string;
}
