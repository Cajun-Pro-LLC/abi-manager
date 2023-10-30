import * as fs from "fs";
import * as path from "path";

export const convert = (abiPath: string, options: Record<string, string>) => {
  internalConvert(abiPath, options);
}

export const internalConvert = (abiPathInput: string, options: Record<string, string>) => {
  if (!fs.existsSync(abiPathInput)) {
    return console.error(`${abiPathInput} does not exist`);
  }
  const abiPath = path.resolve(abiPathInput);
  const stat = fs.lstatSync(abiPath);
  if (stat.isDirectory()) {
    return console.error(`${abiPath} is a directory. try batch-convert instead`);
  }
  if (stat.isFile()) {
    if (path.extname(abiPath) !== ".json") {
      return console.error(`${abiPath} is not a JSON file`);
    }

    const name = path.basename(abiPath, ".json").replace(/abi$/i, "") + "ABI";
    const file = path.resolve(options.output || path.join(path.dirname(abiPath), name + ".ts"));
    const rawAbi: any[] | { abi: any[] } = JSON.parse(fs.readFileSync(abiPath, "utf-8"));
    let abi: any[];
    if (Array.isArray(rawAbi)) {
      abi = rawAbi;
    } else if ("abi" in rawAbi) {
      abi = rawAbi.abi;
    } else {
      return console.error(`Invalid ABI file`);
    }
    const abiString = JSON.stringify(abi, null, 2);
    const data = `const ${name} = ${abiString} as const;\n\nexport default ${name};\n`;
    fs.writeFileSync(file, data);
    console.log(`ABI file converted to ${file}`);
    if (options.destructive) {
      fs.unlinkSync(abiPath);
      console.log(`Deleted ${abiPath}`);
    }
    return name;
  }
}
