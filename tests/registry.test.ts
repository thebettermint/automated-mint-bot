import * as registry from '../src/lib/helpers/registry';
import * as constants from './constants';
import { sampleRegistry as json } from './constants';

describe('registry', () => {
  test('array-addresses', () => {
    let registryAddresses = registry.getAddressArrayRegistry(json);
    expect(registryAddresses).toStrictEqual(constants.registryAddresses);
  });

  test('org-by-ein', () => {
    let testOrganization = registry.getOrganizationDetailsByEIN(
      json,
      '87-3486445'
    );
    expect(testOrganization).toStrictEqual(constants.testOrganization);
  });

  test('wallet-by-ein', () => {
    let testAddress = registry.getOrganizationAddress(json, '12-12343567');
    expect(testAddress).toStrictEqual(constants.testAddress);
  });

  test('init-by-tag', () => {
    let organizations = json['organizations'];
    let organization = organizations[0];
    let initiative = registry.getInitiativeByTag(organization.initiatives, 5);
    if (initiative instanceof Error) throw Error;
    expect(initiative?.title).toStrictEqual('Save the Whales - Test');
  });

  test('tier-by-amount', () => {
    let organizations = json['organizations'];
    let organization = organizations[0];

    let amount = {
      counterparty: '',
      currency: 'XRP',
      value: '100.1',
    };

    let tier = registry.getTierByAmount(
      organization.initiatives[0].tiers,
      amount
    );
    expect(tier?.title).toStrictEqual('Silver Whale');

    amount = {
      counterparty: '',
      currency: 'XRP',
      value: '1000.1',
    };

    tier = registry.getTierByAmount(organization.initiatives[0].tiers, amount);
    expect(tier?.title).toStrictEqual('Gold Whale');

    amount = {
      counterparty: '',
      currency: 'XRP',
      value: '0.5',
    };

    tier = registry.getTierByAmount(organization.initiatives[0].tiers, amount);
    expect(tier?.title).toStrictEqual(undefined);

    organization = organizations[1];
    amount = {
      counterparty: '',
      currency: 'XRP',
      value: '0.5',
    };

    tier = registry.getTierByAmount(organization.initiatives[0].tiers, amount);
    expect(tier?.title).toStrictEqual(undefined);
  });

  test('asset-by-amount', () => {
    let organizations = json['organizations'];
    let organization = organizations[0];

    let amount = {
      counterparty: '',
      currency: 'XRP',
      value: '100.1',
    };

    let asset = registry.getAssetByDonationAmount({
      organization: organization,
      initiative: organization.initiatives[0],
      amount: amount,
    });
    expect(asset).toStrictEqual(
      'https://github.com/thebettermint/registry/blob/main/src/assets/whale/SilverWhale.png?raw=true'
    );

    organizations = json['organizations'];
    organization = organizations[0];

    amount = {
      counterparty: '',
      currency: 'XRP',
      value: '0.5',
    };

    asset = registry.getAssetByDonationAmount({
      organization: organization,
      initiative: organization.initiatives[0],
      amount: amount,
    });
    expect(asset).toStrictEqual(
      'https://github.com/thebettermint/registry/blob/main/src/assets/generic/BronzeToken.png?raw=true'
    );

    organizations = json['organizations'];
    organization = organizations[1];

    amount = {
      counterparty: '',
      currency: 'XRP',
      value: '0.5',
    };

    asset = registry.getAssetByDonationAmount({
      organization: organization,
      initiative: organization.initiatives[0],
      amount: amount,
    });
    expect(asset).toStrictEqual(
      'https://github.com/thebettermint/registry/blob/main/src/assets/generic/BronzeToken.png?raw=true'
    );
  });
});
