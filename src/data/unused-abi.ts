const diamondEvents: string[] = [ "DiamondCut" ] as const;
const diamondFunctions: string[] = [ "diamondCut", "facetAddress", "facetAddresses", "facetFunctionSelectors",
  "facets" ] as const;

const ownerEvents: string[] = [ "OwnershipTransferred" ] as const;
const ownerFunctions: string[] = [ "owner", "transferOwnership" ] as const;

const proxyEvents: string[] = [ "Initialized" ] as const;
const proxyFunctions: string[] = [] as const;

const accessControlEvents: string[] = [ "RoleAdminChanged", "RoleGranted", "RoleRevoked" ] as const;
const accessControlFunctions: string[] = [ "getRoleAdmin", "grantRole", "hasRole", "renounceRole",
  "revokeRole" ] as const;

const pausableEvents: string[] = [ "Paused", "Unpaused" ] as const;
const pausableFunctions: string[] = [ "pause", "unpause", "paused" ] as const;

export const unusedEvents: string[] = [ ...diamondEvents, ...ownerEvents, ...proxyEvents, ...accessControlEvents,
  ...pausableEvents ] as const;
export const unusedFunctions: string[] = [ ...diamondFunctions, ...ownerFunctions, ...proxyFunctions,
  ...accessControlFunctions, ...pausableFunctions ] as const;
