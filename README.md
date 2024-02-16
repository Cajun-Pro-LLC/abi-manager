# ABI Manager

## Install

```bash
npm install -g @dirtycajunrice/abi-manager
```

## Help
```
  ______   _______   ______        __       __
 /      \ /       \ /      |      /  \     /  |
/$$$$$$  |$$$$$$$  |$$$$$$/       $$  \   /$$ |  ______   _______    ______    ______    ______    ______
$$ |__$$ |$$ |__$$ |  $$ |        $$$  \ /$$$ | /      \ /       \  /      \  /      \  /      \  /      \
$$    $$ |$$    $$<   $$ |        $$$$  /$$$$ | $$$$$$  |$$$$$$$  | $$$$$$  |/$$$$$$  |/$$$$$$  |/$$$$$$  |
$$$$$$$$ |$$$$$$$  |  $$ |        $$ $$ $$/$$ | /    $$ |$$ |  $$ | /    $$ |$$ |  $$ |$$    $$ |$$ |  $$/
$$ |  $$ |$$ |__$$ | _$$ |_       $$ |$$$/ $$ |/$$$$$$$ |$$ |  $$ |/$$$$$$$ |$$ \__$$ |$$$$$$$$/ $$ |
$$ |  $$ |$$    $$/ / $$   |      $$ | $/  $$ |$$    $$ |$$ |  $$ |$$    $$ |$$    $$ |$$       |$$ |
$$/   $$/ $$$$$$$/  $$$$$$/       $$/      $$/  $$$$$$$/ $$/   $$/  $$$$$$$/  $$$$$$$ | $$$$$$$/ $$/
                                                                             /  \__$$ |
                                                                             $$    $$/
                                                                              $$$$$$/

Usage: abi-manager [options] [command]

CLI to manage ABI files
Options:
  -f, --friendly-abis                      Store the output in Human Readable mode (default: false)
  -h, --help                               display help for command
  -v, --verbose                            Show verbose logging (default: false)
  -V, --version                            output the version number

Commands:
  batch-convert [options] <directoryPath>  convert a directory of ABI JSON files
  convert [options] <abiPath>              Convert an ABI JSON file to typescript
  help [command]                           display help for command
  trim [options] <abiPath>                 Trim an ABI JSON file of uncommonly used functions

```
