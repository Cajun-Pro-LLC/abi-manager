#!/usr/bin/env node
import { program } from "@commander-js/extra-typings";
import { convert, batchConvert, trim } from "./commands";
import { ascii } from "./data/ascii";

program
  .name("abi-manager")
  .description("CLI to manage ABI files")
  .version("1.0.0")
  .option("-f, --friendly-abis", "Store the output in Human Readable mode", false)
  .option("-v, --verbose", "Show verbose logging", false)
  .configureHelp({
    sortOptions: true,
    showGlobalOptions: true,
    sortSubcommands: true
  })
  .addHelpText("beforeAll", ascii)
program
  .command("convert")
  .description("Convert an ABI JSON file to typescript")
  .argument("<abiPath>", "Path to the ABI JSON file")
  .option("-o, --output <outputPath>", "Path to the output of ABI typescript file")
  .option("-d, --destructive", "Delete the original ABI JSON file", false)
  .action((abiPath, _, cmd) => convert(abiPath, cmd.optsWithGlobals()))

program
  .command("batch-convert")
  .description("convert a directory of ABI JSON files")
  .argument("<directoryPath>", "Path to the directory of ABI JSON files")
  .option("-i, --index-file", "Create an index.ts", false)
  .option("-d, --destructive", "Delete the original ABI file", false)
  .action((directoryPath, _, cmd) => batchConvert(directoryPath, cmd.optsWithGlobals()))

program
  .command("trim")
  .description("Trim an ABI JSON file of uncommonly used functions")
  .argument("<abiPath>", "Path to the ABI JSON file")
  .option("-i, --in-place", "Overwrite the existing abi in place. (Default: create .trimmed.json)", false)
  .action((abiPath, _, cmd) => trim(abiPath, cmd.optsWithGlobals()))

program.parse();
