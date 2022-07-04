/* import fs from 'fs'; */
import { spawnSync } from 'child_process';
import Registry from '@thebettermint/registry/dist/types/Registry';
import { RegistryEntry, Initiative, TierObj } from '../../../types';

/**
 * registryOrganizations
 *
 * @param {string} json - Total registry including document head
 *
 * @return { { name, ein }[] } - Array of organization name and ein
 */
export const getRegistryOrganizations = (json: Registry) => {
  const registry = json['organizations'];
  if (!registry) return;

  let parsedArray = registry
    .map((org: RegistryEntry | undefined) => {
      if (!org) return;
      return { name: org.name, ein: org.EIN };
    })
    .filter(Boolean);

  return parsedArray;
};

/**
 * getOrganizationAddress
 *
 * @param {string} json - Total registry including document head
 * @param {string} ein - Employer identifcation number of organization
 *
 * @return {string | Error} - Address if organization is found in registry
 */
export const getOrganizationAddress = (json: Registry, ein: string) => {
  try {
    const registry = json['organizations'];
    if (!registry) return;

    let filtered = registry.filter((org: RegistryEntry | undefined) => {
      return ein === org?.EIN;
    });

    if (filtered.length > 1)
      throw Error(
        'Duplicate organizations with the same ein in registry. Please refer to repo and contact package maintainer'
      );

    let address = filtered[0].address;
    return address;
  } catch (error: any) {
    return Error(error.msg);
  }
};

/**
 *
 *
 *
 */
export const getOrganizationInitiative = () => {};

/**
 * getOrganizationDetailsByEIN
 *
 * @param { Registry } json - Total registry including document head
 * @param { string } ein - Employer identifcation number of organization
 *
 * @return { RegistryEntry } - Organization's registry entry
 */
export const getOrganizationDetailsByEIN = (json: Registry, ein: string) => {
  try {
    const registry = json['organizations'];
    if (!registry) return;

    let filtered = registry.filter((org: RegistryEntry | undefined) => {
      return ein === org?.EIN;
    });

    if (filtered.length > 1)
      throw Error(
        'Duplicate organizations with the same ein in registry. Please refer to repo and contact package maintainer'
      );

    let org = filtered[0];
    return org;
  } catch (error: any) {
    return Error(error.msg);
  }
};

/**
 * getEINArrayRegistry
 *
 * @param {string} json - Total registry including document head
 *
 * @return { string[] } - Array of registry ein's
 */
export const getEINArrayRegistry = (json: Registry) => {
  try {
    const registry = json['organizations'];
    if (!registry) return;

    let einArray = registry
      .map((org: RegistryEntry | undefined) => {
        return org?.EIN;
      })
      .filter(Boolean);

    if (einArray.length === 0)
      throw Error(
        'No organizations found in registry. Please refer to repo and contact package maintainer'
      );

    return einArray;
  } catch (error: any) {
    return Error(error?.msg);
  }
};

/**
 * getAddressArrayRegistry
 *
 * @param {string} json - Total registry including document head
 *
 * @return { string[] } - Array of registry xrpl addresses
 */
export const getAddressArrayRegistry = (json: Registry) => {
  try {
    const registry = json['organizations'];
    if (!registry) return;

    let addressArray = registry
      .map((org: RegistryEntry | undefined) => {
        return org?.address;
      })
      .filter(Boolean);

    if (addressArray.length === 0)
      throw Error(
        'No organizations found in registry. Please refer to repo and contact package maintainer'
      );

    return addressArray;
  } catch (error: any) {
    return Error(error?.msg);
  }
};

/**
 *
 * determineVersionOfRegistry
 *
 * @return {string} - version of registry
 */
export const determineVersionOfRegistry = () => {
  let packageName = '@thebettermint/registry';
  let whyBuffer = spawnSync('yarn', ['why', packageName]);
  let grepBuffer = spawnSync('grep', ['Found'], { input: whyBuffer.stdout });
  let outputArray = grepBuffer.stdout.toString().split('\n');
  let parsedOutputArray = outputArray
    .filter((output) => output.length > 0)
    .map((output) => output.split('@')[1].replace('"', ''));
  return parsedOutputArray[0];
};

/**
 * getOrganizationDetailsByAddress
 *
 * @param { Registry } json - Total registry including document head
 * @param { string } ein - Employer identifcation number of organization
 *
 * @return { RegistryEntry } - Organization's registry entry
 */
export const getOrganizationDetailsByAddress = (
  json: Registry,
  address: string | undefined
) => {
  try {
    const registry = json['organizations'];
    if (!registry) return;

    let filtered = registry.filter((org: RegistryEntry | undefined) => {
      return address === org?.address;
    });

    if (filtered.length > 1)
      throw Error(
        'Duplicate organizations with the same ein in registry. Please refer to repo and contact package maintainer'
      );

    let org = filtered[0];
    return org;
  } catch (error: any) {
    return Error(error.msg);
  }
};

/**
 * getInitiativeByTag
 *
 * @param { Registry } json - Total registry including document head
 * @param { string } ein - Employer identifcation number of organization
 *
 * @return { RegistryEntry } - Organization's registry entry
 */
export const getInitiativeByTag = (
  initiatives: Initiative[],
  tag: number | undefined
) => {
  try {
    let filtered = initiatives.filter((init: Initiative | undefined) => {
      return tag === init?.tag;
    });

    if (filtered.length === 0) throw Error('Destination tag not found');

    if (filtered.length > 1)
      throw Error(
        'Duplicate inititative with the same tag in registry. Please refer to repo and contact package maintainer'
      );

    let org = filtered[0];
    return org;
  } catch (error: any) {
    return Error(error.msg);
  }
};

/**
 * getInitiativeByTag
 *
 * @param { Registry } json - Total registry including document head
 * @param { string } ein - Employer identifcation number of organization
 *
 * @return { RegistryEntry } - Organization's registry entry
 */
export const getTierByAmount = (
  tiers: TierObj[] | undefined,
  amount: { counterparty: string; currency: string; value: string }
) => {
  try {
    if (!tiers || tiers.length === 0) return;
    let { counterparty, currency, value } = amount;
    let parsedValue = parseFloat(value);

    let filtered = tiers
      .map((tier: TierObj) => {
        if (
          currency === tier.amount.currency &&
          counterparty === tier.amount.issuer &&
          parsedValue >= tier.amount.value
        )
          return tier;
        return;
      })
      .filter(Boolean);

    if (filtered.length === 0) return;

    let sorted = filtered.sort((a, b) => {
      if (!a) return 1;
      if (!b) return -1;
      return b?.amount.value - a?.amount.value;
    });

    return sorted[0];
  } catch (error: any) {
    return;
  }
};

/**
 * getAssetByDonationAmount
 *
 * @param { Registry } json - Total registry including document head
 * @param { string } ein - Employer identifcation number of organization
 *
 * @return { RegistryEntry } - Organization's registry entry
 */
export const getAssetByDonationAmount = ({
  organization,
  initiative,
  amount,
}: {
  organization: RegistryEntry;
  initiative: Initiative | undefined;
  amount: { counterparty: string; currency: string; value: string };
}) => {
  try {
    if (!initiative) return organization.image;
    if (!initiative.tiers && initiative.defaultAsset)
      return initiative.defaultAsset;

    if (!initiative.tiers && !initiative.defaultAsset)
      return organization.image;

    if (initiative.tiers) {
      let tier: TierObj | undefined = getTierByAmount(initiative.tiers, amount);
      if (tier) return tier.asset;
      if (!tier) return initiative.defaultAsset;
    }
    throw Error('Trouble getting image for donation');
  } catch (error: any) {
    return Error(error.msg);
  }
};
