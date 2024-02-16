import { existsSync, lstatSync, readdirSync, unlinkSync, writeFileSync } from "fs";
import { extname, join, resolve } from "path";
import { WithGlobalOpts } from "../types/commands";
import { getABI, getJSONFile } from "../util/file";
import { formatABI } from "../util/format";

type ConvertOpts = {
  output?: string;
  destructive?: boolean;
}

const converter = (abiPathInput: string, options: WithGlobalOpts<ConvertOpts>) => {

  const file = getJSONFile(abiPathInput, options.output);
  const abi = getABI(file.in.path);

  const abiString = formatABI(abi, options.friendlyAbis);
  const data = `const ${file.out.name} = ${abiString} as const;\n\nexport default ${file.out.name};\n`;
  writeFileSync(file.out.path, data);
  console.log(`ABI file converted to ${file.out.path}`);
  if (options.destructive) {
    unlinkSync(file.in.path);
    console.log(`Deleted ${file.in.path}`);
  }
  return file.out.name;
};

export const convert = (abiPath: string, options: WithGlobalOpts<ConvertOpts>) => {
  // shadow to return void
  converter(abiPath, options);
};

type BatchConvertOpts = {
  indexFile?: boolean;
  destructive?: boolean;
}
export const batchConvert = (directoryPath: string, options: WithGlobalOpts<BatchConvertOpts>) => {
  if (!existsSync(directoryPath)) {
    return console.error(`${directoryPath} does not exist`);
  }

  const stat = lstatSync(directoryPath);
  if (!stat.isDirectory()) {
    return console.error(`${directoryPath} is not a directory.`);
  }
  const allFiles = readdirSync(directoryPath);
  const jsonFiles = allFiles.filter(f => extname(f) === ".json");
  const newFileNames: string[] = [];
  for (const file of jsonFiles) {
    const filePath = join(directoryPath, file);
    const name = converter(filePath, options);
    if (name) {
      newFileNames.push(name);
    }
  }

  if (newFileNames.length > 0 && options.indexFile) {
    const data = newFileNames.map(name => `export * from "./${name}";`).join("\n") + "\n";
    const file = resolve(join(directoryPath, "index.ts"));
    writeFileSync(file, data);
    console.log("Created index file:", file);
  }
  console.log(`${jsonFiles.length} ABI files converted!`);
};
