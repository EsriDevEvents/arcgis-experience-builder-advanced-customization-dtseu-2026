import type { ImmutableObject } from 'seamless-immutable'

export interface Config {
  exampleText: string
}

export type IMConfig = ImmutableObject<Config>
