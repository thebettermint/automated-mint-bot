import * as registry from '../src/lib/registry';
import * as constants from './constants';
import json from './constants/registry.test.json';

describe('Registry tests', () => {
  test('parsing registry for array of addresses', () => {
    let registryAddresses = registry.getAddressArrayRegistry(json);
    expect(registryAddresses).toStrictEqual(constants.registryAddresses);
  });

  test('querying registry for organization details with EIN', () => {
    let testOrganization = registry.getOrganizationDetailsByEIN(
      json,
      '87-3486445'
    );
    expect(testOrganization).toStrictEqual(constants.testOrganization);
  });

  test('querying registry for organization wallet address with EIN', () => {
    let testAddress = registry.getOrganizationAddress(json, '12-12343567');
    expect(testAddress).toStrictEqual(constants.testAddress);
  });
});
