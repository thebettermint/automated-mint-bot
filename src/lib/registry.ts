import fs from 'fs';

/**
 *
 *
 *
 */
export const readRegistry = () => {
  let registryJSON = fs.readFileSync(
    '@thebettermint/registry/src/registry.json'
  );
  return registryJSON;
};

/**
 *
 *
 *
 */
export const parseRegistry = () => {};

/**
 *
 *
 *
 */
export const registryOrganizations = () => {};

/**
 *
 *
 *
 */
export const getOrganizationAddress = () => {};

/**
 *
 *
 *
 */
export const getOrganizationInitiative = () => {};

export const getOrganizationDetailsByEIN = () => {};

/**
 *
 *
 *
 */
export const getEINArrayRegistry = () => {};

/**
 *
 *
 *
 */
export const determineVersionOfRegistry = () => {};
