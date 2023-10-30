#!/usr/bin/env node
import { program } from "commander";
import { convert, batchConvert } from "./commands";

program
  .name("abi-manager")
  .description("CLI to manage ABI files")
  .version("0.0.1")
  .option("-v, --verbose", "show verbose logging", false)

program.command("convert")
  .description("convert an ABI file")
  .argument("<abiPath>", "Path to the ABI file")
  .option("-o, --output <outputPath>", "Path to the output of ABI file")
  .option("-d, --destructive", "Delete the original ABI file")
  .action(convert)

program.command("batch-convert")
  .description("convert a directory of ABI files")
  .argument("<directoryPath>", "Path to the directory of ABI files")
  .option("-i, --index-file", "create an index.ts")
  .option("-d, --destructive", "Delete the original ABI file")
  .action(batchConvert)

program.parse();
