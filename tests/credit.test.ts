import * as constants from './constants';
import parse from '../src/lib/parse';

const temp = {
  source: 'rNnfe5Z7wBrvZtuYg1sx4nDJH6i8Pat4pm',
  destination: '',
  source_balance_changes: [
    { counterparty: '', currency: 'XRP', value: '-0.5' },
  ],
  destination_balance_changes: [
    { counterparty: '', currency: 'XRP', value: '500' },
  ],
  destination_tag: 5,
  currency: 'XRP',
  amount: '0.5',
  delivered_amount: '0.5',
  source_currency: 'XRP',
  ledger_index: 3560751,
  time: 710250181,
  tx_hash: 'D5EC6C1A4B5D65F141F136AA7498DB5DAD4973939663E02D67B543AA70028D72',
  fee: '0.012',
};

describe('credit', () => {
  test('parse-0', () => {
    let tx = temp;
    tx.destination = constants.registryAddresses[0];
    tx.destination_balance_changes[0].value = '0.5';
    tx.destination_tag = 5;
    let meta = parse.TXtoCreditMetadata(tx);
    expect(meta?.attributes[0].name).toStrictEqual(undefined);

    tx.destination_balance_changes[0].value = '20';
    meta = parse.TXtoCreditMetadata(tx);
    expect(meta?.attributes[0].name).toStrictEqual('Bronze Whale');

    tx.destination_balance_changes[0].value = '100';
    meta = parse.TXtoCreditMetadata(tx);
    expect(meta?.attributes[0].name).toStrictEqual('Silver Whale');

    tx.destination_balance_changes[0].value = '500';
    meta = parse.TXtoCreditMetadata(tx);
    expect(meta?.attributes[0].name).toStrictEqual('Gold Whale');
  });

  test('parse-1', () => {
    let tx = temp;
    tx.destination = constants.registryAddresses[1];
    tx.destination_balance_changes[0].value = '0.5';
    tx.destination_tag = 8;
    let meta = parse.TXtoCreditMetadata(tx);
    expect(meta?.attributes[0].name).toStrictEqual(undefined);

    tx.destination_balance_changes[0].value = '20';
    meta = parse.TXtoCreditMetadata(tx);
    expect(meta?.attributes[0].name).toStrictEqual(undefined);

    tx.destination_balance_changes[0].value = '100';
    meta = parse.TXtoCreditMetadata(tx);
    expect(meta?.attributes[0].name).toStrictEqual(undefined);

    tx.destination_balance_changes[0].value = '500';
    meta = parse.TXtoCreditMetadata(tx);
    expect(meta?.attributes[0].name).toStrictEqual(undefined);
  });

  test('parse-2', () => {
    let tx = temp;
    tx.destination = constants.registryAddresses[2];
    tx.destination_balance_changes[0].value = '0.5';
    tx.destination_tag = 18;
    let meta = parse.TXtoCreditMetadata(tx);
    expect(meta?.attributes[0].name).toStrictEqual(undefined);

    tx.destination_balance_changes[0].value = '20';
    meta = parse.TXtoCreditMetadata(tx);
    expect(meta?.attributes[0].name).toStrictEqual(undefined);

    tx.destination_balance_changes[0].value = '100';
    meta = parse.TXtoCreditMetadata(tx);
    expect(meta?.attributes[0].name).toStrictEqual(undefined);

    tx.destination_balance_changes[0].value = '500';
    meta = parse.TXtoCreditMetadata(tx);
    expect(meta?.attributes[0].name).toStrictEqual(undefined);
  });

  test('parse-3', () => {
    let tx = temp;
    tx.destination = constants.registryAddresses[3];
    tx.destination_balance_changes[0].value = '0.5';
    tx.destination_tag = 36;
    let meta = parse.TXtoCreditMetadata(tx);
    expect(meta?.attributes[0].name).toStrictEqual(undefined);

    tx.destination_balance_changes[0].value = '5';
    meta = parse.TXtoCreditMetadata(tx);
    expect(meta?.attributes[0].name).toStrictEqual('Bronze Taco');

    tx.destination_balance_changes[0].value = '10';
    meta = parse.TXtoCreditMetadata(tx);
    expect(meta?.attributes[0].name).toStrictEqual('Silver Taco');

    tx.destination_balance_changes[0].value = '20';
    meta = parse.TXtoCreditMetadata(tx);
    expect(meta?.attributes[0].name).toStrictEqual('Gold Taco');
  });

  test('wrong-dest', () => {
    let tx = temp;
    tx.destination = constants.registryAddresses[3];
    tx.destination_balance_changes[0].value = '0.5';
    tx.destination_tag = 30;
    let meta = parse.TXtoCreditMetadata(tx);
    expect(meta).toStrictEqual(undefined);
  });
});
