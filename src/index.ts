import xrplSubscriptionToRegistryWS from './lib/ws';
import { /* serverURL, */ mainServerURL } from './lib/constants';
import json from '@thebettermint/registry/src/registry.json';
import lib from './lib';
import { wsStatusMessages } from './lib/constants';
import { TransactionStream } from 'xrpl';

import parse from './lib/parse';

const main = () => {
  const registryAddresses = lib.registry.getAddressArrayRegistry(json);
  if (registryAddresses instanceof Error) return;

  let subscribe = new xrplSubscriptionToRegistryWS({
    url: mainServerURL,
    registry: registryAddresses,
    test: true,
  });

  subscribe.ws?.once(wsStatusMessages.connected, () => {
    console.log(wsStatusMessages.connected);
  });

  subscribe.ws?.addListener(wsStatusMessages.tx, (event: TransactionStream) => {
    //console.log(wsStatusMessages.tx);
    let handled: any = parse.txHandler(event);
    let parsed = parse.allPayments(handled);
    if (!parsed) return;

    console.log(parsed);
    if (
      !parsed.destination ||
      registryAddresses?.indexOf(parsed.destination) === -1
    )
      return;

    let index = registryAddresses?.indexOf(parsed.destination);
    console.log(index);
    console.log(parsed);

    //TO DO
    // Parse transactions and throw away all types except for validated payment types
    // Check if destination matches one of the registry accounts
    // If false -> return
    // If true ->
    // check the type of token ( issuer / currency ) of the payment
    // check if on the list of approved currencies ( default XRP )
    // check if the donation amount is greater than minimum limit ( default 5 XRP )
    //      note: this is to avoid and filter out spam donations
    // check to see if organization account destination tag has enough to mint
    // if true -> mint token and send to donors account
  });
};

main();
