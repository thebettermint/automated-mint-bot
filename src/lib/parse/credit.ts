import lib from '../../lib';
import { PaymentInterface } from '@thebettermint/xrpl-tx-parser';
import json from '@thebettermint/registry/src/registry.json';
import { rippleTimeToUnixTime } from 'xrpl';

export const TXtoCreditMetadata = (tx: PaymentInterface) => {
  let organization = lib.registry.getOrganizationDetailsByAddress(
    json,
    tx.destination
  );
  if (organization instanceof Error || !organization) return;

  let initiative = lib.registry.getInitiativeByTag(
    organization.initatives,
    tx.destination_tag
  );

  let image = lib.registry.getAssetByDonationAmount({
    organization: organization,
    initiative: initiative,
    amount: tx.destination_balance_changes[0],
  });

  let tier = lib.registry.getTierByAmount(
    initiative.tiers,
    tx.destination_balance_changes[0]
  );
  let { counterparty, currency, value } = tx.destination_balance_changes[0];

  return {
    file: {
      hash: tx.tx_hash,
      organization: organization.name,
      wallet: organization.address,
      logo: organization.image,
      ein: organization.EIN,
      phone: organization.phone,
      donor: tx.source,
      amount: {
        issuer: counterparty,
        currency: currency,
        value: parseFloat(value),
      },
      time: rippleTimeToUnixTime(tx.time),
      initiative: initiative.title,
      tag: initiative.tag,
    },
    image: image,
    collection: {
      name: initiative.title,
      family: 'thebettermint collection',
    },
    attributes: [
      {
        name: tier?.name,
        description: tier?.description,
        amount: {
          issuer: counterparty,
          currency: currency,
          value: parseFloat(value),
        },
      },
    ],
  };
};
