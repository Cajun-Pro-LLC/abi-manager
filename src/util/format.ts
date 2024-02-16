import { Abi, formatAbi } from "abitype";

export const formatABI = (abi: Abi, friendly: boolean = false) => {
  return JSON.stringify(friendly ? formatAbi(abi) : abi, null, 2);
};
