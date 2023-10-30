import * as fs from "fs";
import * as path from "path";
import { internalConvert as convert } from "./convert";

export const batchConvert = (directoryPath: string, options: Record<string, string>) => {
  if (!fs.existsSync(directoryPath)) {
    return console.error(`${directoryPath} does not exist`);
  }

  const stat = fs.lstatSync(directoryPath);
  if (!stat.isDirectory()) {
    return console.error(`${directoryPath} is not a directory. try convert instead`);
  }
  const allFiles = fs.readdirSync(directoryPath);
  const jsonFiles = allFiles.filter(f => path.extname(f) === ".json");
  const newFileNames: string[] = [];
  for (const file of jsonFiles) {
    const filePath = path.join(directoryPath, file);
    const name = convert(filePath, options);
    if (name) {
      newFileNames.push(name);
    }
  }

  if (newFileNames.length > 0 && options.indexFile) {
    const data = newFileNames.map(name => `export * from "./${name}";`).join("\n") + "\n";
    const file = path.resolve(path.join(directoryPath, "index.ts"));
    fs.writeFileSync(file, data);
    console.log("Created index file:", file);
  }
  console.log(`${jsonFiles.length} ABI files converted!`);
}
