import { Abi, parseAbi } from "abitype";
import { existsSync, lstatSync, readFileSync } from "fs";
import { basename, dirname, extname, join, resolve } from "path";

export const getJSONFile = (inPath: string, outPath?: string, outExtension: string = "ts") => {
  const resolvedInPath = resolve(inPath);
  const resolvedInDir = dirname(resolvedInPath);
  const resolvedInExt = extname(resolvedInPath);
  const resolvedInName = basename(resolvedInPath, resolvedInExt);

  if (!existsSync(resolvedInPath)) {
    throw new Error(`${resolvedInPath} does not exist`);
  }

  const stat = lstatSync(resolvedInPath);
  if (stat.isDirectory()) {
    throw new Error(`${resolvedInPath} is a directory.`);
  }
  if (!stat.isFile()) {
    throw new Error(`${resolvedInPath} is not a file.`);
  }

  if (resolvedInExt !== ".json") {
    throw new Error(`${resolvedInPath} is not a .json file`);
  }
  const resolvedOutDir = dirname(resolve(outPath || resolvedInPath));
  const resolvedOutName = resolvedInName.replace(/abi$/i, "") + "ABI";
  const resolvedOutExt = `.${outExtension}`;
  const resolvedOutPath = join(resolvedOutDir, `resolvedOutName${resolvedOutExt}`);
  return {
    in: {
      dir: resolvedInDir,
      name: resolvedInName,
      ext: resolvedInExt,
      fullName: `${resolvedInName}.${resolvedInExt}`,
      path: resolvedInPath,
    },
    out: {
      dir: resolvedOutDir,
      name: resolvedOutName,
      ext: resolvedOutExt,
      fullName: `${resolvedOutName}.${resolvedInExt}`,
      path: resolvedOutPath,
    },
  };
};

export const getABI = (path: string) => {
  const rawAbi: any[] | { abi: any[] } = JSON.parse(readFileSync(path, "utf-8"));
  if (Array.isArray(rawAbi)) {
    if (rawAbi.length > 0) {
      if (typeof rawAbi[0] === "string") {
        return parseAbi(rawAbi);
      }
      return rawAbi as Abi;
    }
    throw new Error(`Empty ABI array`);
  } else if ("abi" in rawAbi) {
    return rawAbi.abi as Abi;
  } else {
    throw new Error(`Invalid ABI file`);
  }
};
