import type { AbiError, AbiEvent, AbiFunction } from "abitype";
import { writeFileSync } from "fs";
import { unusedEvents, unusedFunctions } from "../data/unused-abi";
import { WithGlobalOpts } from "../types/commands";
import { getABI, getJSONFile } from "../util/file";
import { formatABI } from "../util/format";

type TrimOpts = {
  inPlace: boolean;
}

export const trim = (abiPathInput: string, options: WithGlobalOpts<TrimOpts>) => {
  const file = getJSONFile(abiPathInput, undefined, "trimmed.ts");
  const abi = getABI(file.in.path);
  console.log(options);
  const cleanAbi: (AbiError | AbiEvent | AbiFunction)[] = [];
  for (let i = 0; i < abi.length; i++) {
    const item = abi[i];
    switch (item.type) {
      case "constructor":
      case "receive":
      case "fallback": {
        if (options.verbose) {
          console.log(`Trimming ${item.type}`);
        }
        break;
      }
      case "event": {
        if (unusedEvents.includes(item.name)) {
          if (options.verbose) {
            console.log(`Trimming event ${item.name}`);
          }
          break;
        }
        if (options.verbose) {
          console.log(`Keeping ${item.type} ${item.name}`);
        }
        cleanAbi.push(item);
        break;
      }
      case "error":
      case "function": {
        if (unusedFunctions.includes(item.name) || item.name.endsWith("_ROLE")) {
          if (options.verbose) {
            console.log(`Dropping ${item.type} ${item.name}`);
          }
          break;
        }
        if (options.verbose) {
          console.log(`Keeping ${item.type} ${item.name}`);
        }
        cleanAbi.push(item);
      }
    }
  }
  console.log(`Trimmed ${abi.length - cleanAbi.length}/${abi.length} items from ${file.out.name}`);
  const abiString = formatABI(cleanAbi, options.friendlyAbis);
  writeFileSync(options.inPlace ? file.in.path : file.out.path, abiString);
};
