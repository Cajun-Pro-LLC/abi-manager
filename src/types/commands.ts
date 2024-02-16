export type GlobalOpts = {
  help: boolean
  verbose: boolean
  friendlyAbis: boolean
}

export type WithGlobalOpts<T> = GlobalOpts & T
